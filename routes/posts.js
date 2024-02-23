const router = require('express').Router();

const { getPosts, createPost, likePost } = require('../controllers/posts');

router.get('/', getPosts).post('/', createPost).put('/:id', likePost);

module.exports = router;
