var db = require('mongoose').connection;
var Post = require('../Models/Post');
var NullChecker = require('../Utilities/common.js');

class PostController {
	//getters
	//gets a list of posts given a filter
	static getPosts(filter) {

	}

	//get information for a post given a post id
	static getPostById(id) {
		return Post.find({postId: id}, (err, postInfo) => {
			if (err) {
				return console.error(err);
			}

			return postInfo;
		});
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
		}, (err, postInfo) => {
			if (err) {
				return console.error(err);
			}

			return postInfo;
		});
	}

	//setters
	static addPost(uplId, resId, desc, long, lat, tags) {
		
		let arrayToCheck = [uplId,
			resId,
			long,
			lat];
		if (NullChecker(arrayToCheck)) {
			//return some error
			throw Error("ERROR: Some required fields are null");
		}

		var newPost = new Post({
			
			uploaderId: uplId,
			restaurantId: resId,
			description: desc,

			location: {
				type: "Point",
				coordinates: [parseInt(long), parseInt(lat)]
			},
			tags: tags,
			likedBy: [],
			commentedBy: [],
			bookmarkedBy: []

		});

		newPost.save((err, success) => {
			if (err) {
				return console.error(err);
			}

			return success;
		});
	}

	static updatePost(updateOptions) {
		const updateQuery = {};
		if (updateOptions.description) {
			updateQuery.description = updateOptions.description;
		}
		if (updateOptions.addTags) {
			updateQuery.profileUri = updateOptions.profileUri;
		}

		return User.updateOne({ userId: updateOptions.userId }, { $set: updateQuery }, (err, success) => {
			if (err) {
				return console.error(err);
			}

			//TODO
			return "success";
		});
	}

	static interactWithPost(interactOptions) {

	}

	static deletePost(postId) {
		
	}
}

module.exports = PostController;