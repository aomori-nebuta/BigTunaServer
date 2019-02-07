const Mongoose = require('mongoose');
const db = Mongoose.connection;
var User = require('../Models/User');

class UserController {
	//getters
	static getUserById(id) {
		return User.find({ _id: Mongoose.Types.ObjectId(id) });
	}

	//setters
	static addUser(addOptions) {
		const addQuery = {
			userName: addOptions.userName,
			fullName: addOptions.fullName,
			location: {
				type: "Point",
				coordinates: [parseInt(addOptions.longitude), parseInt(addOptions.latitude)]
			}
		}
		if (addOptions.profileUri) {
			addQuery.profileUri = addOptions.profileUri
		}
		if (addOptions.description) {
			addQuery.description = addOptions.description;
		}

		var newUser = new User(addQuery);

		return newUser.save();
	}

	static updateUser(updateOptions) {
		const updateQuery = {};

		Object.entries(updateOptions).forEach((entry) => {
			if (entry[1]) {
				updateQuery[entry[0]] = entry[1];
			}
		});

		if (updateOptions.longitude && updateOptions.latitude) {
			updateQuery.location = {
				type: "Point",
				coordinates: [parseInt(updateOptions.longitude), parseInt(updateOptions.latitude)]
			}
		}

		return User.updateOne({ _id: Mongoose.Types.ObjectId(updateOptions.userId) }, { $set: updateQuery });
	}

	static deleteUserById(userId) {
		return User.findOneAndDelete({ _id: Mongoose.Types.ObjectId(userId) });
	}
}

module.exports = UserController;