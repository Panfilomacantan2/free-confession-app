const Post = require('../models/posts');
const needle = require('needle');
const url = require('url');
const { BASE_URL } = process.env;

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		if (!posts) return res.json({ message: 'No posts found' });

		const response = await needle('get', `${BASE_URL}`, { json: true });

		res.send(response.body);
	} catch (err) {
		res.json({ message: err });
	}
};


const createPost = async (req, res) => {
	try {
		const post = await Post.create(req.body);

		post.save();
		console.log(req.body);
		if (post) {
			res.status(201).send(post);
		}
	} catch (error) {
		console.log(`Post error: ${error.message}`);
	}
};

module.exports = {
	getPosts,
	createPost
};
