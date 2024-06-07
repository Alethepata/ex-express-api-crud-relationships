const express = require('express');
const router = express.Router();

const { index, show, create, update, destroy } = require('../controllers/controllerPosts.js');

router.get('/', index);

router.get('/:slug', show);

router.post('/', create);

router.put('/:slug', update);

router.delete('/:slug', destroy);

module.exports = router;