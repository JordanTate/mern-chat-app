// Packages
const express = require('express');

// Set Router
const router = express.Router();

// Controller Functions
const { userSignUp, userLogin } = require('../controllers/userController');

// Routes
router.post('/register', userSignUp);
router.post('/login', userLogin);

// Export Router
module.exports = router;
