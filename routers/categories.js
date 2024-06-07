const express = require('express');
const router = express.Router();

const { create } = require('../controllers/controllerCategories.js');

router.post('/', create)

module.exports = router;