var mongoose = require('mongoose');
var schema = mongoose.Schema({
    user: String,
    title: String,
    options: [
    	{ 
    		name: String,
    		count: Number
    	}
    ],
    username: String
});

var Poll = mongoose.model('Poll', schema);

module.exports = Poll;