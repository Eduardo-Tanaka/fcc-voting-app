var mongoose = require('mongoose');
var schema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

var User = mongoose.model('User', schema);

module.exports = User;