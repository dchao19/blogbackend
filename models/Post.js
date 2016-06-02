var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Comment = require('./Comment');
var Schema = mongoose.Schema;

var Post = new Schema({
    content: String,
    title: String,
    comments: [Comment.schema],
    tags: [String],
    markdown: String
});

Post.plugin(timestamps);

module.exports = mongoose.model('Post', Post);
