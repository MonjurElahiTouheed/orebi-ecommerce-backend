const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
    res.json('Welcome to dashboard');
})

module.exports = router;