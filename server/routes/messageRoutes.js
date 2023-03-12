// Packages
const express = require('express');

// Set Router
const router = express.Router();

// Controller Functions
const { createMessage, getMessages } = require('../controllers/messageController');

// Routes
router.post('/', createMessage);
router.get('/:chat', getMessages);

// Export Router
module.exports = router;
