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
	static addPost(options) {
		const query = {
			uploaderId: Mongoose.Types.ObjectId(options.uploaderId),
			restaurantId: Mongoose.Types.ObjectId(options.restaurantId),
			description: options.description,
			location: {
				type: "Point",
				coordinates: [parseInt(options.longitude), parseInt(options.latitude)]
			}
		};
		if (options.tags) {
			query.tags = options.tags;
		}
		if (options.restaurantRating) {
			query.restaurantRating = options.restaurantRating;
		}

		var newPost = new Post(query);

		return newPost.save();
	}

	static updatePost(options) {
		const query = {};
		if (options.description) {
			query.description = options.description;
		}
		if (options.addTags) {
			query.profileUri = options.profileUri;
		}

		return Post.updateOne({ _id: Mongoose.Types.ObjectId(options.userId) }, { $set: query });
	}

	static interactWithPost(interactOptions) {

	}

	static deletePostById(postId) {
		return Post.findOneAndDelete({ _id: Mongoose.Types.ObjectId(postId) });
	}
}

module.exports = PostController;