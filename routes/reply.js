const router = require('express').Router();

const { reply, getReplies } = require('../controllers/reply');

router.get('/:id', getReplies).post('/:id', reply);

module.exports = router;
