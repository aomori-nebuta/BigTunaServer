require('express-async-errors');
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
		uploaderId: req.params.userId
	}

	const result = await PostController.getPosts(filter);
	
	res.send(result);
});

//updates user information for the given id
//TODO security/user auth token
app.patch('/:userId', async function (req, res) {
	let updateOptions = {
		userId: req.params.userId,
		userName: req.query.username,
		profileUri: req.query.profileuri
	};

	const result = await UserController.updateUser(updateOptions);

	res.send(result);
});

//adds a user to the database, used by the auth service when creating a new account
app.post('/', async function (req, res) {
	let userId = req.query.userid;
	let userName = req.query.username;
	let profileUri = req.query.profileuri;

	const result = await UserController.addUser(userId, userName, profileUri);

	res.send(result);
});

module.exports = app;