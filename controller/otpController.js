const userSchema = require("../model/userSchema");

 async function otpController (req, res) {
    const {email, otp} = req.body;
    const user = await userSchema.findOne({email});
    console.log(user);

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

module.exports = otpController;