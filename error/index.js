/**
 * Created by vital on 7/10/2015.
 */
var path = require('path'),
    util= require('util'),
    http = require('http');

//errors for users
function httpError(status,message){
    Error.apply(this,arguments);
    Error.captureStackTrace(this,httpError);

    this.status = status;
    this.message=message || http.STATUS_CODES[status] || "Error";
}

util.inherits(httpError,Error);
httpError.prototype.name='httpError';

exports.httpError = httpError;
