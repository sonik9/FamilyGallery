var express = require('express');
var path = require('path');
//var fs = require('fs');
var logger = require('morgan');
var favicon = require('serve-favicon');
var log = require('./lib/log')(module);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('./lib/mongoose')
var httpError = require('error').httpError;
var config = require('config');
var routes = require('./routes');
var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('template', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// setup the logger
app.use(logger('dev'));

app.use(cookieParser());
var MongoStrore = require('connect-mongo')(session);
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: false,
    saveUninitialized: true,
    store: new MongoStrore({mongooseConnection: mongoose.connection})
}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));


app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));
//require('routes')(app);


//routers
app.use('/', routes);


/*app.use(function (req, res, next) {
 if (req.url === "/") {
 res.end("Hello");
 } else
 next();
 });*/

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 log.info('qwdqwdqwd');
 });*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
 app.use(function (err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
 message: err.message,
 error: err
 });
 });
 }*/

// production error handler
// no stacktraces leaked to user

app.use(function (err, req, res, next) {

    if (typeof err == 'number') {
        err = new httpError(err);
    }

    if (err instanceof httpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            log.error(err);
            err = new httpError(500);
            res.sendHttpError(err);
        }
    }


});


module.exports = app;
