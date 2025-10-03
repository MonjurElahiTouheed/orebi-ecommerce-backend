const express = require('express');
const registrationController = require('../../controller/registrationController');
const {otpController, resendOtpController} = require('../../controller/otpController');
const router = express.Router();

router.post('/registration', registrationController);
router.post('/verifyyouremailbyotp', otpController);
router.post('/resendOtp', resendOtpController);

module.exports = router;