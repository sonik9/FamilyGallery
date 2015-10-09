/**
 * Created by vital on 8/10/2015.
 */
exports.get = function(req,res,next){

    res.render('storage',{title: 'Family Gallery - Storage'});
};
exports.post = function(req,res,next){

    var files = req.files;
    files.forEach(file,i, function (err) {
        console.log(i+":"+file);
    });

};