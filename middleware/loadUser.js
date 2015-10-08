/**
 * Created by vital on 8/10/2015.
 */
var User = require('model/user').User;

module.exports = function(req,res,next){
    req.user = res.locals.user = null;
    if(!req.session.user) return next();

    User.findById(req.session.user,function(err,user){
       if(err) return next(err);

        req.user = res.locals.user = user;
        next();
    });
}