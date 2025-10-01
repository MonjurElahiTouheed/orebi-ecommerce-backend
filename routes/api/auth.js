const express = require('express');
const registrationController = require('../../controller/registrationController');
const otpController = require('../../controller/otpController');
const router = express.Router();

router.post('/registration', registrationController);
router.post('/verifyyouremailbyotp', otpController);

module.exports = router;