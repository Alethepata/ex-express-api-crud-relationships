const express = require('express');
const router = express.Router();

const { index, show, create, update, destroy } = require('../controllers/controllerCategories.js');

const validator = require('../middlewares/validator.js');

const { dataName } = require('../validations/generic.js');

router.get('/', index);

router.get('/:id', show);

router.post('/', validator(dataName), create);

router.put('/:id', validator(dataName), update);

router.delete('/:id', destroy);

module.exports = router;