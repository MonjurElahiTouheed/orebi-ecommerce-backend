const emailVerification = require("../helpers/emailVerification");
const userSchema = require("../model/userSchema");
const crypto = require('crypto');
 async function otpController (req, res) {
    const {email, otp} = req.body;
    const user = await userSchema.findOne({email});
    console.log(user);
    if(!user){
        return res.json({
            error: "Email is required"
        })
    }
    if(email.verified) {
        return res.json({
            message: "This email is already verified"
        });
    }
    else if(user.otp != otp) {
        return res.json({
            message: "OTP did not match."
        })
    }
    else if(user?.otpExpire < Date.now()) {
        return res.json({
            message: "OTP did not match."
        })
    }
    else{
        const userVerify = await userSchema.findOneAndUpdate({email},
            {$set: {verified: true}, $unset: {otp: "", otpExpire: ""}},
            {new: true}
        );
        return res.json({
            message: "Your email is verified"
        })
    }
}

async function resendOtpController (req, res) {
    const {email} = req.body;
    if(!email){
        res.json({
            error: "Email is required"
        })
    }
    const user = await userSchema.findOne({email});
    if(!user){
        res.json({
            error: "This email is not registered"
        })
    }
    else{
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

        const userResendOtp = await userSchema.findOneAndUpdate(
            {email},
            {
                $set: {otp: otp, otpExpire: otpExpire}
            },
            {
                new: true
            }
        )
        emailVerification(email, otp);
        res.status(200).json({
            message: "OTP sent succesfully"
        })
    }
}

module.exports = {otpController, resendOtpController};