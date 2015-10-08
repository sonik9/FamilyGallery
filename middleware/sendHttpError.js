/**
 * Created by vital on 7/10/2015.
 */
module.exports = function(req,res,next){
    res.sendHttpError = function(err){
        res.status(err.status);
        if(req.headers['x-requested-with']=='XMLHttpRequest'){
            res.json(err.message);
        }else{
            res.render("error", {
                message: err.message,
                error: err,
                status:err.status
            });
        }

    }
    next();
}