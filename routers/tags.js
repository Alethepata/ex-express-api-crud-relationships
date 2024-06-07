const express = require('express');
const router = express.Router();

const { create } = require('../controllers/controllerTags.js');

router.post('/', create)

module.exports = router;