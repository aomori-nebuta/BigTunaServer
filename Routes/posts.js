//TODO individual error handling
//see https://thecodebarbarian.com/80-20-guide-to-express-error-handling
require('express-async-errors');
const app = require('express')();

var UserController = require('../Controllers/UserController.js');
const PostController = require('../Controllers/PostController.js');

const PostsActionType = Object.freeze({
	DISCOVER: "discover",
	EDIT: "edit",
	INTERACT: "interact",
	COMMENT: "comment"
});

const METERS_PER_MILE = 1609.34;

//gets a list of posts, must send user auth token
//used for retrieving home screen discovery posts
//TODO security & batch
app.get('/', async function (req, res) {
	switch (req.query.action) {
		case PostsActionType.DISCOVER: {
			const filter = {};

			if (req.query.tags) {
				filter.tags = {
					$all: req.query.tags.replace(/\s\s*/g,"").trim().split(",") //must be comma separated string
				}
			}
			//TODO, throw incorrect format error if some but not all of these params exist
			if (req.query.longitude && req.query.latitude && req.query.radius) {
				filter.location = {
					$geoNear: {
						$maxDistance: parseFloat(req.query.radius) * METERS_PER_MILE,
						$geometry: {
							type: "Point",
							coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
						}
					}
				}
			}

			const result = await PostController.getPosts(filter);

			res.status(200).send(result);

			break;
		}
		default:
			throw Error("Unauthorized attempt to grab all posts");
	}
});

//gets information for the given post id
app.get('/:postId', async function (req, res) {
	const result = await PostController.getPostById(req.params.postId);

	res.status(200).send(result);
});

//TODO food post
//TODO file upload handling
//TODO validate post adding
app.post('/', async (req, res) => {
	const options = {
		userId: req.body.userId,
		restaurantId: req.body.restaurantId,
		restaurantRating: req.body.restaurantRating,
		description: req.body.description,
		longitude: req.body.longitude,
		latitude: req.body.latitude
	};
	if (req.body.tags) {
		options.tags = req.body.tags.replace(/\s\s*/g,"").trim().split(","); //must be comma separated string
	}
	//let files = req.files;
	const postResult = await PostController.addPost(options);
	const userResult = await UserController.updateUserPost({
		userId: req.body.userId,
		postId: postResult._id
	});

	res.status(201).send(userResult);
});

//TODO authentication
//TODO be able to upload more photos/remove photos
//updates a post, used when editing a post or when other users interact with the post (like, comment, bookmark)
app.patch('/:postId', async function (req, res) {
	const options = { postId: req.params.postId };

	switch (req.query.action) {
		case PostsActionType.EDIT: {
			options.restaurantId = Mongoose.Types.ObjectId(req.body.restaurantId);
			options.restaurantRating = parseInt(req.body.restaurantRating);
			options.description = req.body.description;
			if (req.body.tags) {
				options.tags = req.body.tags.replace(/\s\s*/g,"").trim().split(","); //must be comma separated string
			}

			const result = await PostController.updatePost(options);
			
			res.status(200).send(result);
			break;
		}
		case PostsActionType.INTERACT: {
			options.interactionAction = req.body.interactionAction;
			options.interactionType = req.body.interactionType;
			options.interactorId = req.body.interactorId;

			const result = await PostController.updatePostInteractions(options);
			
			res.status(200).send(result);
			break;
		}
		case PostsActionType.COMMENT: {
			options.commentAction = req.body.commentAction;
			options.text = req.body.text;
			options.userId = req.body.userId;
			options.commentId = req.body.commentId;

			const result = await PostController.updatePostComments(options);
			
			res.status(200).send(result);
			break;
		}
		default: {
			throw Error("action type was not supplied");
			break;
		}
	}
		
});

//TODO, also remove post from associated user's post field
//to do this, we should pass in the userid
//delete a post
app.delete('/:postId', async function (req, res) {
	const result = await PostController.deletePostById(req.params.postId);
	
	//TODO
	//UserController.DeleteUserPost()
	res.status(200).send(result);
});


module.exports = app;