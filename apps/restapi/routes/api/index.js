const express = require('express');
const router = express.Router();
const user = require('./user');
const file = require('./file');
const table = require('./table');

router.use('/user', user.router);
router.use('/file', file.router);
router.use('/tables', table.router);

module.exports = router;