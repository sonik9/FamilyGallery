var log = require('../lib/log')(module),
    User = require('../model/user').User;
exports.get=function get(req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
}
