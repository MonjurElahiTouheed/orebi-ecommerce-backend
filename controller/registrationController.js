const emailValidation = require("../helpers/emailValidation");
const passwordValidation = require("../helpers/passwordValidation");
const userSchema = require("../model/userSchema");
const bcrypt = require('bcrypt');

async function registrationController(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const alreadyExistUser = await userSchema.findOne({email: email});
    if (!firstName) {
        return res.json({
            message: 'Please give your firstName'
        })
    }
    if (!lastName) {
        return res.json({
            message: 'Please give your lastName'
        })
    }
    if (!email) {
        return res.json({
            message: 'Please give your email'
        })
    }
    if (!emailValidation(email)) {
        return res.json({
            message: 'Please write your correct email'
        })
    }
    if (!passwordValidation(password)) {
        return res.json({
            message: 'Please give password of minimum 8 characters long and lowercase, uppercase, special characters and numbers.'
        })
    }
    if (alreadyExistUser) {
        console.log(alreadyExistUser)
        return res.json({
            message: 'Email already exists'
        })
    }
    if (!password) {
        return res.json({
            message: 'Please give your password'
        })
    }
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        const user = new userSchema({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        })
        user.save();
        res.status(201).json({
            message: 'Your account created successfully',
            data: user
        })
    });

}

module.exports = registrationController;