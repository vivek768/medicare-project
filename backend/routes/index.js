const express = require('express');
const router = express.Router();

// router.use('/user', require('./user'));
router.use('/reports', require('./report'));
module.exports = router;