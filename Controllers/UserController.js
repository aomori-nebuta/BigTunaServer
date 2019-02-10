const Mongoose = require('mongoose');
const db = Mongoose.connection;
var User = require('../Models/User');

class UserController {
	//getters
	static getUserById(id) {
		return User.find({
			_id: Mongoose.Types.ObjectId(id)
		});
	}

	//setters
	static addUser(options) {
		const query = {
			userName: options.userName,
			fullName: options.fullName,
			location: {
				type: "Point",
				coordinates: [parseInt(options.longitude), parseInt(options.latitude)]
			}
		}
		if (options.profileUri) {
			query.profileUri = options.profileUri
		}
		if (options.description) {
			query.description = options.description;
		}

		var newUser = new User(query);

		return newUser.save();
	}

	static updateUser(options) {
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

		return User.updateOne({ _id: Mongoose.Types.ObjectId(options.userId) }, { $set: query });
	}

	static modifyUserPost(options) {
		return User.updateOne({
			_id: Mongoose.Types.ObjectId(options.userId)
		}, {
			[options.action]: {
				posts: options.postId
			}
		});
	}

	static deleteUserById(userId) {
		return User.findOneAndDelete({
			_id: Mongoose.Types.ObjectId(userId)
		});
	}
}

module.exports = UserController;