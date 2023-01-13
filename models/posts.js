const mongoose = require('mongoose');
const moment = require('moment-timezone');
const generateChars = require('../utils/generateChars');

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
});

module.exports = mongoose.model('Post', postSchema);
