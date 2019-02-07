//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FoodInfo = new Schema({
	imageUri: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}, // editable
	menuItemId: String, //used to reference which food item it is in the restaurant
	priceRange: { type: Number,
		min: 1,
		max: 5
	},
	recommended: Boolean
});

var Comment = new Schema ({
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	text: {
		type: String,
		required: true
	}
});

var Post = new Schema({
	//metadata, autogenerated
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}, //only updated for uploader interactions

	//display info
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	restaurantId: Schema.Types.ObjectId, //editable
	restaurantRating: { type: Number,
		min: 1,
		max: 5
	}, //editable
	description: {
		type: String,
		required: true
	}, // editable
	location: {
		type: { type: String },
		coordinates: {
			type: [Number],
			required: true
		}
	},
	tags: {
		type: [String],
		default: []
	}, //editable
	likes: {
		type: [Schema.Types.ObjectId],
		default: []
	}, //editable
	comments: {
		type: [Comment],
		default: []
	}, //editable
	bookmarks: {
		type: [Schema.Types.ObjectId],
		default: []
	}, //editable

	//food items
	items: [FoodInfo] //editable
});

Post.index({ location: "2dsphere" });

module.exports = mongoose.model('Post', Post);