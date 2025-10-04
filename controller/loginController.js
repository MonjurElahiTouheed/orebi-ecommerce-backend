const emailValidation = require("../helpers/emailValidation");
const passwordValidation = require("../helpers/passwordValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginController(req, res) {
    const {email, password} = req.body;
    if(!email) {
       return res.json({
            error: "email is required"
        })
    }
    if(!password) {
        return res.json({
            error: "password is required"
        })
    }
    if(!emailValidation){
        return res.json({
            error: "please provide valid email"
        })
    }
    if(!passwordValidation){
        return res.json({
            error: "password did not match"
        })
    }
    const user = await userSchema.findOne({email});
    if(!user){
        return res.json({
            error: "email is not found"
        })
    }
    if(!user.verified){
        return res.json({
            error: "Please verify your email first"
        })
    }

    const accessToken = jwt.sign(
        {
            userId: user._id,
            firstName: user.firstName,
            email:  user.email,
            role: user.role
        },
        'monjurmern2406',
        {
            expiresIn: "10m"
        }
    );
    console.log(accessToken);
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.json({
            error: "password is not matched"
        })
    }
    else{
        return res.json({
            message: "login successfully done",
            accessToken: accessToken
        })
    }

}

module.exports = loginController;