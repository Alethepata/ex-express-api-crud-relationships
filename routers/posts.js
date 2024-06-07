const express = require('express');
const router = express.Router();

const { index, show, create, update, destroy } = require('../controllers/controllerPosts.js');

const validator = require('../middlewares/validator.js');

const { data } = require('../validations/posts.js');

const { slugParams } = require('../validations/generic.js');

router.use('/:slug', validator(slugParams));

router.get('/', index);

router.get('/:slug', show);

router.post('/', validator(data), create);

router.put('/:slug', validator(data), update);

router.delete('/:slug', destroy);

module.exports = router;