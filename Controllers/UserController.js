const Mongoose = require('mongoose');
const db = Mongoose.connection;
var User = require('../Models/User');

class UserController {
	//getters
	static getUserById(id) {
		return User.find({userId: id}, (err, userInfo) => {
			if (err) {
				return console.error(err);
			}

			return userInfo;
		});
	}

	//setters
	static addUser(userId, userName, profileUri) {
		var newUser = new User({
			userId: userId,
			userName: userName,
			profileUri: profileUri
		});

		newUser.save((err, success) => {
			if (err) {
				return console.error(err);
			}

			return success;
		});
	}

	static updateUser(updateOptions) {
		const updateQuery = {};
		if (updateOptions.userName) {
			updateQuery.userName = updateOptions.userName;
		}
		if (updateOptions.profileUri) {
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
}

module.exports = UserController;