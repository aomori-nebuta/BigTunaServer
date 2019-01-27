//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FoodPost = new Schema({
  foodPostId: String,
  foodPicture: String,
  caption: String,
  //foodItemId: String, //used to reference which food item it is in the restaurant
  priceRange: { type: Number, min: 1, max: 5 },
  recommended: Boolean
});

var Post = new Schema({
  //metadata
  postId: String,
  latitude: Number,
  longitude: Number,

  //display info
  uploaderId: String,
  restaurantId: String,
  postedOn: Date,
  description: String,
  tags: [String],
  likedBy: [String],
  commentedBy: [String],
  bookmarkedBy: [String],

  //food items
  items: [FoodPost]
});

module.exports = mongoose.model('Post', Post);