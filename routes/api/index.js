const express = require('express');
const router = express.Router();
const authRoute = require('./auth');

router.use('/authorization', authRoute);   

module.exports = router;