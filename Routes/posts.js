//TODO individual error handling
//see https://thecodebarbarian.com/80-20-guide-to-express-error-handling
require('express-async-errors');
const app = require('express')();

const PostController = require('../Controllers/PostController.js');

//gets a list of posts, must send user auth token
//used for retrieving home screen discovery posts
//TODO security & batch
app.get('/', async function (req, res) {
	//TODO, create filter object and pass
	PostController.getPosts();
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
	const addOptions = {
		uploaderId: req.body.userId,
		restaurantId: req.body.restaurantId,
		restaurantRating: req.body.restaurantRating,
		description: req.body.description,
		longitude: req.body.longitude,
		latitude: req.body.latitude
	};
	if (req.body.tags) {
		updateOptions.tags = req.body.tags.split[","]; //must be comma separated string
	}
	//let files = req.files;
	const result = await PostController.addPost(addOptions);

	res.status(201).send({
		response: result
	});
});

//TODO finish method
//TODO authentication
//TODO be able to upload more photos/remove photos
//updates a post, used when editing a post or when other users interact with the post (like, comment, bookmark)
app.patch('/:postId', async function (req, res) {
	const actionType = req.body.action;
	let updateOptions = { postId: req.params.postId };
	
	try {
		switch (req.body.action) {
			case PostActionType.EDIT: {
				updateOptions.description = req.body.description;
				updateOptions.addTags = req.body.addTags.split[","] || []; //must be comma separated string
				updateOptions.removeTags = req.body.removeTags.split[","] || []; //must be comma separated string

				let result = await PostController.updatePost(updateOptions);
				
				res.status(200).send({
					response: result
				});
				break;
			}
			case PostActionType.ADDLIKE: {
				updateOptions.addLikes = req.body.addLikes.split[","] || []; //must be comma separated string
				
				let result = await PostController.interactWithPost(updateOptions);
				
				res.status(200).send({
					response: result
				});
				break;
			}
			case PostActionType.REMOVELIKE: {
				updateOptions.removeLikes = req.body.removeLikes.split[","] || []; //must be comma separated string
				break;
			}
			case PostActionType.ADDCOMMENT: {
				updateOptions.addComments = req.body.addComments.split[","] || []; //must be comma separated string
				break;
			}
			case PostActionType.REMOVECOMMENT: {
				updateOptions.removeComments = req.body.removeComments.split[","] || []; //must be comma separated string
				break;
			}
			case PostActionType.ADDBOOKMARK: {
				updateOptions.addBookmarks = req.body.addBookmarks.split[","] || []; //must be comma separated string
				break;
			}
			case PostActionType.REMOVEBOOKMARK: {
				updateOptions.removeBookmarks = req.body.removeBookmarks.split[","] || []; //must be comma separated string
				break;
			}
			default: {
				res.status(500).send(Error("action type was not supplied"));
				break;
			}
		}
	} catch (err) {
		res.status(500).send(err);
	}
		
});

//delete a post
app.delete('/:postId', async function (req, res) {
	const result = await PostController.deletePostById(req.params.postId);
	
	res.status(200).send(result);
});


module.exports = app;