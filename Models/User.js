//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
	userName: {
		type: String,
		required: true
	}, //editable
	fullName: {
		type: String,
		required: true
	}, //editable
	profileUri: {
		type: String,
		default: "empty"
	}, //editable
	description: {
		type: String,
		default: ""
	}, //editable
	location: {
		type: { type: String },
		coordinates: {
			type: [Number],
			required: true
		},
	}, //editable
	posts: {
		type: [String],
		default: []
	} //editable
});

module.exports = mongoose.model('User', User);