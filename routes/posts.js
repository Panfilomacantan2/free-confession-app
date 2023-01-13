const router = require('express').Router();

const { getPosts, createPost } = require('../controllers/posts');

router.get('/', getPosts).post('/', createPost);

module.exports = router;
