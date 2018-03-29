const express = require('express');
const router = express.Router();
const user = require('./user');
const file = require('./file');

router.use('/user', user.router);
router.use('/file', file.router);

module.exports = router;