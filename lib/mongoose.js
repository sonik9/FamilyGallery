/**
 * Created by vital on 6/10/2015.
 */
var mongoose = require('mongoose'),
    assert= require('assert'),
    config = require('../config');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));

module.exports = mongoose;