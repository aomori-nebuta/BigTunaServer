var db = require('mongoose').connection;

class PostController {
	//getters
	//gets a list of posts given a filter
	static getPosts(filter) {

	}

	//get information for a post given a post id
	static getPostById(id) {

	}

	//gets a list of posts within a location radius with the given latitude and longitude as the center
	static getPostsByLocation(lat, long, radius) {
		return "";
	}

	//setters
	static addPost() {
	}

	static updatePost() {

	}

	static deletePost() {
		
	}
}

module.exports = PostController;