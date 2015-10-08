/**
 * Created by vital on 8/10/2015.
 */
var User = require('model/user').User,
    authError = require('model/user').authError,
    httpError = require('error').httpError;

exports.signin = function (req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;

    User.auth(email, pass, function (err, user) {
        if (err) {
            if (err instanceof authError) {
                return next(403);
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        //res.redirect('/');
        res.send({});
    });
};

exports.signout = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
};

exports.signup = function (req, res, next) {
    var email = req.body.regEmail;
    var pass = req.body.regPassword;
    var passrepeat = req.body.repeatpassword;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    if (pass === passrepeat) {
        User.create(email, pass, firstname, lastname, function (err, user) {
            if (err) {
                if (err instanceof authError) {
                    return next(new httpError(403,err.message));
                } else {
                    return next(err);
                }
            }else{
                res.send(email);
            }
        });
    } else {
        return next(403, "Password error")
    }
};