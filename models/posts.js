const mongoose = require('mongoose');
const moment = require('moment-timezone');
const generateChars = require('../utils/generateChars');

// post schema
const postSchema = mongoose.Schema({
	codeName: String,
	message: String,
	createdAt: {
		type: Date,
		default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
	},
	category: {
		type: String,
		default: 'Appreciation',
	},
	avatar: {
		type: String,
		default: () => `https://avatars.dicebear.com/api/micah/${generateChars()}.svg`,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],

	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Like',
		},
	],
});

// comment schema
const commentSchema = new mongoose.Schema({
	text: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	// each comment can only relates to one blog, so it's not in array
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
	},
});

const likeSchema = new mongoose.Schema({
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
});


const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', postSchema);
const Like = mongoose.model('Like', likeSchema);

module.exports = { Comment, Post, Like };
