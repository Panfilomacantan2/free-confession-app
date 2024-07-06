const router = require('express').Router();

const { getPosts, createPost, likePost, deletePost } = require('../controllers/posts');

router.get('/', getPosts).post('/', createPost).put('/:id', likePost).delete('/:id', deletePost);

module.exports = router;
