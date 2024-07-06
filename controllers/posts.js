const { Post, Like } = require('../models/posts');
const needle = require('needle');
const url = require('url');
const { BASE_URL } = process.env;

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		if (!posts) return res.json({ message: 'No posts found' });

		const response = await needle('get', `${BASE_URL}`, { json: true });

		console.log(posts);

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

const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Post.findById(id);

		// check if the user has already liked the post
		// if (post.likes.filter((like) => like.user === req.user.id).length > 0) {
		// 	return res.status(400).json({ msg: 'Post already liked' });
		// }

		const newLike = new Like({ post: post._id, likes: req.body.likes });

		post.likes.push(newLike);

		post.save();
		res.json(post);

		console.log(req.body);
		console.log(req.params);
	} catch (error) {
		console.log(`Post error: ${error.message}`);
	}
};

//  Delete post
const deletePost = (req, res) => {
	const { id } = req.params;

	Post.findByIdAndDelete(id, (err, post) => {
		if (err) {
			res.status(500).json({ message: `Error: ${err}` });
		} else {
			res.status(200).json({ message: `Confession deleted successfully` });
		}
	});

	console.log(id);
};

module.exports = {
	deletePost,
	getPosts,
	createPost,
	likePost,
};
