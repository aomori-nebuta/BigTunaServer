const router = require('express').Router();

var UserController = require('../Controllers/UserController.js');
var PostController = require('../Controllers/PostController.js');

var User = require('../Models/User');

var NullChecker = require('../Utilities/common.js')

//gets user information for the given user id
router.get('/:userId', async function (req, res) {
	let userId = req.params.userId;

	let user = await UserController.getUserById(userId);
	res.send(user);
});

//TODO security & batch
//gets all the posts made by the given user id
router.get('/:userId/posts', function (req, res) {
	//check for filter
	//TODO
	res.send(PostController.getPosts(filter));
});

//updates user information for the given id
//TODO security/user auth token
router.patch('/:userId', async function (req, res) {
	let userUpdateOptions = {};
	userUpdateOptions.userId = req.params.userId;
	userUpdateOptions.userName = req.query.username;
	userUpdateOptions.profileUri = req.query.profileuri;

	if (!NullChecker([userUpdateOptions.userId])) {
		//return some error
		return "error";
	}

	let result = await UserController.updateUser(userUpdateOptions);
	res.send(result);
});

//adds a user to the database, used by the auth service when creating a new account
router.post('/', async function (req, res) {
	let userId = req.query.userid;
	let userName = req.query.username;
	let profileUri = req.query.profileuri;
	if (!NullChecker([userId, userName])) {
		//return some error
		return "error";
	}

	let result = await UserController.addUser(userId, userName, profileUri);
	res.send(result);
});

module.exports = router;