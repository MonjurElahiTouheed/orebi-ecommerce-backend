const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const homeRoute = require('./home');
router.use('/authorization', authRoute);   
router.use('/home', homeRoute);
module.exports = router;