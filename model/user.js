/**
 * Created by vital on 6/10/2015.
 */
var crypto = require('crypto'),
    async = require('async'),
    util = require('util'),
    salt = "123123123123";

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
var userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        firstname: {
            type: String,
            required: true},
        lastname: {
            type: String,
            required: true}
    }
);

userSchema.methods.encryptPass = function (pass) {
    return crypto.createHmac('sha1', salt).update(pass).digest('hex');
};

/*userSchema.virtual("pass1").set(function(pass) {
 this._plainPassword = pass;
 this.salt = Math.random() + '';
 this.password = this.encryptPass(pass);
 })
 .get(function () {
 return this._plainPassword;

 });*/

userSchema.pre('save', function (next) {
    var user = this;
    //console.log(user);
    // only hash the password if it has been modified (or is new)
    // if (!user.isModified('password')) return next();
    //user.salt = Math.random() + '';
    user.password = this.encryptPass(user.password);
    return next();
});

userSchema.methods.checkPass = function (pass) {
    //return assert.equal(this.encryptPass(password), this.password);
    return this.encryptPass(pass) === this.password;
};

userSchema.statics.auth = function (email,password,cb) {
    var User = this;
    async.waterfall([
        function (cb) {
            User.findOne({email: email},cb);
        },
        function(user,cb){
            if(user){
                if(user.checkPass(password)){
                    cb(null,user);
                }else{
                    cb(new authError("Bad credentials"));
                }
            }else{
                cb(new authError("Bad credentials"));
            }
        }
    ], cb);
};

userSchema.statics.create = function(email,password,firstname,lastname,cb){
    var User = this;
            var user = new User({
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
            });
            user.save(function(err){
               if(err) return cb(new authError("User already exist!"));
                cb(null,user);
            });
};
exports.User = mongoose.model('User', userSchema);

function authError(message){
    Error.apply(this,arguments);
    Error.captureStackTrace(this,authError);

    this.message=message;
}
util.inherits(authError,Error);
authError.prototype.name='authError';

exports.authError = authError;


