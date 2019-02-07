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

	//setters
	static addPost(options) {
		const query = {
			userId: Mongoose.Types.ObjectId(options.userId),
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

		Object.entries(options).forEach((entry) => {
			if (entry[1]) {
				query[entry[0]] = entry[1];
			}
		});

		if (options.longitude && options.latitude) {
			query.location = {
				type: "Point",
				coordinates: [parseInt(options.longitude), parseInt(options.latitude)]
			}
		}

		query.updatedAt = Date.now;

		return Post.updateOne({ _id: Mongoose.Types.ObjectId(options.postId) }, { $set: query });
	}

	static updatePostInteractions(options) {
		const query = {}
		query[options.interactionAction] = {};
		query[options.interactionAction][options.interactionType] = Mongoose.Types.ObjectId(options.interactorId);
		
		return Post.updateOne({ _id: Mongoose.Types.ObjectId(options.postId) }, query);
	}

	static updatePostComments(options) {
		const query = {};
		query[options.commentAction] = {
			comments: {}
		};

		if (options.text && options.userId) {
			query[options.commentAction].comments.userId = Mongoose.Types.ObjectId(options.userId);
			query[options.commentAction].comments.text = options.text;
		} else if (options.commentId) {
			query[options.commentAction].comments._id = options.commentId;
		} else {
			throw Error("incorrect format for comment action type");
		}

		return Post.findByIdAndUpdate( Mongoose.Types.ObjectId(options.postId), query);
	}

	static deletePostById(postId) {
		return Post.findOneAndDelete({ _id: Mongoose.Types.ObjectId(postId) });
	}
}

module.exports = PostController;