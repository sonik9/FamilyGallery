var express = require('express');
var router = express.Router();
var log = require('../lib/log')(module),
    httpError = require('error').httpError,
    User = require('../model/user').User,
    ObjectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser');
var checkAuth = require('middleware/checkAuth');
//module.exports = function (app) {
/* GET home page. */

router.get('/', require('./home').get);
router.post('/signin', require('./sign').signin);
router.post('/signout', require('./sign').signout);
router.post('/signup', require('./sign').signup);

router.get('/storage',checkAuth,require('./storage').get);
router.post('/storage/upload',checkAuth,require('./storage').post);

/*

router.get('/q', function(req, res){
    var html = '<form action="/q" method="post">' +
        'Enter your name:' +
        '<input type="text" name="userName" placeholder="..." />' +
        '<br>' +
        '<button type="submit">Submit</button>' +
        '</form>';

    res.send(html);
});

router.post('/q', function(req, res){
    var userName = req.body.userName;
    var html = 'Hello: ' + userName + '.<br>' +
        '<a href="/">Try again.</a>';
    res.send(html);
});*/







router.get('/u', require('./users').get);

router.get('/u/:id', function (req, res, next) {
    try {
        var id = new ObjectId(req.params.id);
    } catch (e) {
        next(404);
        return;
    }
    User.findById(id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(404);
        }
        res.json(user);
    });
});
//}

module.exports = router;
