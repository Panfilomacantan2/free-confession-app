const { Post, Comment } = require('../models/posts');
const needle = require('needle');
const url = require('url');
const { BASE_URL } = process.env;

const getReplies = async (req, res) => {
	Post.findById({ _id: req.params.id })
		.populate('comments')
		.then((post) => {
			console.log(post);
			res.status(200).send(post);
		})
		.catch((error) => {
			console.log(error);
		});
};

const reply = async (req, res) => {
	try {
		Post.findById(req.params.id)
			.then((post) => {
				if (!post) throw new Error('Post not found');

				const newComment = new Comment({ text: req.body.reply, post: post._id });
				post.comments.push(newComment);

				return Promise.all([newComment.save(), post.save()]);
			})
			.then((results) => {
				res.status(201).send(results);
			});
	} catch (error) {
		console.log(`Post error: ${error.message}`);
	}
};

module.exports = {
	getReplies,
	reply,
};
