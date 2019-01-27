//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
	userId: String,
	userName: String,
	profileUri: String,
	//followers: [String],
	posts: [String]
});

module.exports = mongoose.model('User', User);