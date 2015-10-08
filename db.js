/**
 * Created by vital on 6/10/2015.
 */
var assert = require('assert');
var User= require('./model/user').User;

var user = new User({
    email:"admin1",
    password:"bridg01"

});

user.save(function(err,user,aff){
    //if(err) throw err;
    console.log(arguments);
});