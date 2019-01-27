const router = require('express').Router();

var PostController = require('../Controllers/PostController.js');

//gets a list of posts, must send user auth token
//used for retrieving home screen discovery posts
//TODO security & batch
router.get('/', function (req, res) {
	PostController.getPosts();
});

//gets information for the given post id
router.get('/:postId', function (req, res) {
	res.send(PostController.getPostById());
});

//TODO validate post adding
router.post('/', function (req, res) {
	res.send(PostController.addPost());
});

//updates a post, used when editing a post
router.patch('/:postId', function (req, res) {
	res.send(PostController.getPostById());
});

module.exports = router;