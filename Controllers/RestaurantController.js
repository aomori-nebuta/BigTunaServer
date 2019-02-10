const Mongoose = require('mongoose');
const db = Mongoose.connection;
const Restaurant = require('../Models/Restaurant');

class RestaurantController {
	//getters
	//get information for a restaurant given a restaurant id
	static getRestaurantById(id) {
		return Restaurant.find({ _id: Mongoose.Types.ObjectId(id) });
	}

	//setters
	//adds info about a restaurant into the database
	//for internal use only
	static addRestaurant(options) {
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
		if (options.tags) {
			query.tags = options.tags;
		}
		if (options.rating) {
			query.rating = options.rating;
		}

		var newRestaurant = new Restaurant(query);

		return newRestaurant.save();
	}

	//for internal use only
	static updateRestaurant(options) {
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

		return Restaurant.updateOne({ _id: Mongoose.Types.ObjectId(options.restaurantId) }, { $set: query });
	}

	static modifyRestaurantPosts(options) {
		return Restaurant.updateOne({
			_id: Mongoose.Types.ObjectId(options.restaurantId)
		}, {
			[options.action]: {
				posts: options.postId
			}
		});
	}

	//for internal use only
	static deleteRestaurantById(restaurantId) {
		return Restaurant.findOneAndDelete({ _id: Mongoose.Types.ObjectId(restaurantId) });
	}
}

module.exports = RestaurantController;