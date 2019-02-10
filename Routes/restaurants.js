//TODO individual error handling
//see https://thecodebarbarian.com/80-20-guide-to-express-error-handling
require('express-async-errors');
const app = require('express')();

const RestaurantController = require('../Controllers/RestaurantController.js');


//TODO do we need to get a list of restaurants anywhere?
//we may not need to support this route
app.get('/', async function (req, res, next) {
});

//gets information for the given restaurant id
app.get('/:restaurantId', async function (req, res) {
	const result = await RestaurantController.getRestaurantById(req.params.restaurantId);

	res.status(200).send(result);
});

//TODO authentication
//used to update a restaurant info
//for internal use only
app.patch('/:restaurantId', async function (req, res) {
	const options = {
		restaurantId: req.params.restaurantId,
		name: req.body.name,
		address: req.body.address,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		phone: req.body.phone,
		website: req.body.website
	};

	const result = await RestaurantController.updateRestaurant(options);

	res.status(200).send(result);
});


//TODO should we have an update route for internal use only that updates restaurant info when it needs to be updated?

module.exports = app;