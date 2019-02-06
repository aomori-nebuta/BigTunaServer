const Mongoose = require('mongoose');
const db = Mongoose.connection;
const Post = require('../Models/Post');

class PostController {
	//getters
	//gets a list of posts given a filter
	static getPosts(filter) {
		return Post.find(filter);
	}

	//get information for a post given a post id
	static getPostById(id) {
		return Post.find({ _id: Mongoose.Types.ObjectId(id) });
	}

	//gets a list of posts within a location radius with the given latitude and longitude as the center
	static getPostsByLocation(long, lat, radius) {
		return Post.find({
			location: {
				$near: {
					$maxDistance: radius,
					$geometry: {
						type: "Point",
						coordinates: [long, lat]
					}
				}
			}
		});
	}

	//setters
	static addPost(addOptions) {
		const addQuery = {
			uploaderId: addOptions.uploaderId,
			restaurantId: addOptions.restaurantId,
			description: addOptions.description,
			location: {
				type: "Point",
				coordinates: [parseInt(addOptions.longitude), parseInt(addOptions.latitude)]
			}
		};
		if (addOptions.tags) {
			addQuery.tags = addOptions.tags;
		}
		if (addOptions.restaurantRating) {
			addQuery.restaurantRating = addOptions.restaurantRating;
		}

		var newPost = new Post(addQuery);

		return newPost.save();
	}

	static updatePost(updateOptions) {
		const updateQuery = {};
		if (updateOptions.description) {
			updateQuery.description = updateOptions.description;
		}
		if (updateOptions.addTags) {
			updateQuery.profileUri = updateOptions.profileUri;
		}

		return Post.updateOne({ userId: updateOptions.userId }, { $set: updateQuery });
	}

	static interactWithPost(interactOptions) {

	}

	static deletePostById(postId) {
		return Post.findOneAndDelete({ _id: Mongoose.Types.ObjectId(postId) });
	}
}

module.exports = PostController;