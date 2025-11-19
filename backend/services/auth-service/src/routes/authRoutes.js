const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyToken);

module.exports = router;
