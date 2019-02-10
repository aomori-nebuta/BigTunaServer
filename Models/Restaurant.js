//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Restaurant = new Schema({
	name: {
		type: String,
		required: true
	}, //editable interally
	address: {
		type: String,
		required: true
	}, //editable interally
	location: {
		type: { type: String },
		coordinates: {
			type: [Number],
			required: true
		},
	}, //editable interally
	phone: {
		type: String,
		required: true
	}, //editable interally
	website: {
		type: String,
		required: true
	}, //editable interally

	//we can get aggregate ratings and tags from posts collection
	//since we have to fetch posts anyways
	posts: {
		type: [Schema.Types.ObjectId],
		default: []
	}, //editable
});

module.exports = mongoose.model('Restaurant', Restaurant);