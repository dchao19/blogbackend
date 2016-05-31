var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    username: String,
    userType: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
