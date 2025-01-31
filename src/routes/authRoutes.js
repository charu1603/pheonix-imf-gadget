const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login a user using username and password (token is generated)
router.post('/login', authController.login);

module.exports = router;