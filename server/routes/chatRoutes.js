// Packages
const express = require('express');

// Set Router
const router = express.Router();

// Controller Functions
const { createChat, getChats } = require('../controllers/chatController');

// Routes
router.post('/', createChat);
router.get('/', getChats);

// Export Router
module.exports = router;
