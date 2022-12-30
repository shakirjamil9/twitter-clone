const express = require('express');
const router = express.Router();
const { signup } = require('../controller/authController');
const { follow } = require('../controller/followController');

router.post('/signup', signup);
router.post('/follow', follow);

module.exports = router;
