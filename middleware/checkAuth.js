/**
 * Created by Vitalii on 9/10/2015.
 */
var HttpError = require('error').httpError;

module.exports = function(req, res, next) {
    if (!req.session.user) {
        return next(new HttpError(401, "You are not authorized!"));
    }

    next();
};