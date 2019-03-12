require('express-async-errors');

const multer = require('multer');
const upload = multer();
const app = require('express')();

var UserController = require('../Controllers/UserController.js');
var PostController = require('../Controllers/PostController.js');

//gets user information for the given user id
app.get('/:userId', async function (req, res) {
	const result = await UserController.getUserById(req.params.userId);
	
	res.send(result);
});

//TODO security & batch
//gets all the posts made by the given user id
app.get('/:userId/posts', async function (req, res) {
	filter = {
		userId: req.params.userId
	}

	const result = await PostController.getPosts(filter);

	res.send(result);
});

//TODO security/user auth token
//updates user information for the given id
app.patch('/:userId', async function (req, res) {
	const options = {
		userId: req.params.userId,
		userName: req.body.userName,
		fullName: req.body.fullName,
		profileUri: req.body.profileUri,
		description: req.body.description,
		longitude: req.body.longitude,
		latitude: req.body.latitude
	};

	const result = await UserController.updateUser(options);

	res.send(result);
});

//adds a user to the database, used by the auth service when creating a new account
app.post('/', async function (req, res) {
	const options = {
		userName: req.body.userName,
		fullName: req.body.fullName,
		profileUri: req.body.profileUri,
		description: req.body.description,
		longitude: req.body.longitude,
		latitude: req.body.latitude
	}

	const result = await UserController.addUser(options);

	res.send(result);
});

//removes the specified user from the database
app.delete('/:userId', async function (req, res) {
	const result = await UserController.deleteUserById(req.params.userId);
	
	res.status(200).send(result);
});

module.exports = app;