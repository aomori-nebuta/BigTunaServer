const router = require('express').Router();

var PostController = require('../Controllers/PostController.js');

//gets a list of posts, must send user auth token
//used for retrieving home screen discovery posts
//TODO security & batch
router.get('/', async function (req, res) {

	//TODO, create filter object and pass
	PostController.getPosts();
});

//gets information for the given post id
router.get('/:postId', async function (req, res) {
	try {
		let result = await PostController.getPostById(req.params.postId);
		res.status(200).send({
			response: {
				result: result
			}
		});
	} catch (err) {
		res.status(500).send(err);
	}	
});

//TODO food post
//TODO file upload handling
//TODO validate post adding
router.post('/', async function (req, res) {
	let uploaderId = req.body.userId;
	let restaurantId = req.body.restaurantId || null;
	let description = req.body.description;
	let longitude = req.body.longitude;
	let latitude = req.body.latitude;
	let tags = req.body.tags.split[","] || []; //must be comma separated string
	
	//let files = req.files;

	try {
		let result = await PostController.addPost(
			uploaderId,
			restaurantId,
			description,
			longitude,
			latitude,
			tags
		);
		res.status(201).send({
			response: "post created for user " + uploaderId
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

//TODO authentication
//TODO be able to upload more photos/remove photos
//updates a post, used when editing a post or when other users interact with the post (like, comment, bookmark)
router.patch('/:postId', async function (req, res) {
	let actionType = req.body.action;
	let updateOptions = { postId: req.params.postId };
	
	try {
		switch (req.body.action) {
			case PostActionType.EDIT: {
				updateOptions.description = req.body.description;
				updateOptions.addTags = req.body.addTags.split[","] || []; //must be comma separated string
				updateOptions.removeTags = req.body.removeTags.split[","] || []; //must be comma separated string

				let result = await PostController.updatePost(updateOptions);
				res.status(200).send({
					response: "post updated for postId " + updateOptions.postId
				});
				break;
			}
			case PostActionType.ADDLIKE: {
				updateOptions.addLikes = req.body.addLikes.split[","] || []; //must be comma separated string
				
				let result = await PostController.interactWithPost(updateOptions);
				res.status(200).send({
					response: "post updated for postId " + updateOptions.postId
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
router.delete('/:postId', async function (req, res) {
	try {
		let result = PostController.deletePostById(req.params.postId);
		res.status(200).send({
			response: "post deleted for postId " + updateOptions.postId
		});

	} catch (err) {
		res.status(500).send(err);
	}
});


module.exports = router;