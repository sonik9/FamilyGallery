/**
 * Created by vital on 8/10/2015.
 */
exports.get = function get(req, res, next) {
    res.render('index', {title: 'Family Gallery'});
}