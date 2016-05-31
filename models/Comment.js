var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var Comment = new Schema({
    name: String,
    text: String
});

Comment.plugin(timestamps);

module.exports = mongoose.model('Comment', Comment);
