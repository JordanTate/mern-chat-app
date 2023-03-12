// Models
const Message = require('../models/message');

// ---------- Controller Functions ---------- //

// Create New Message
const createMessage = async (req, res) => {
	// Get Message Info from Request
	const { message, chat, sender } = req.body;

	// Validation
	if (!message || !chat || !sender) return res.status(500).json({ error: 'There was an error sending message. There may be missing information, please check you are logged in.' });

	try {
		// Create Message
		const msg = await Message.create({ message, chat, sender });

		// Return Message
		return res.status(200).json(msg);
	} catch (error) {
		return res.status(500).json({ error: 'Unable to send message. Please try again' });
	}
};

// Get Messages via Chat
const getMessages = async (req, res) => {
	// Get Chat ID from Request Parameters
	const { chat } = req.params;

	// Validation
	if (!chat) return res.status(500).json({ error: 'There was an error fetching Messages. Please check you are logged in.' });

	try {
		// Get Messages
		const messages = await Message.find({ chat });

		// Return Message
		return res.status(200).json(messages);
	} catch (error) {
		return res.status(500).json({ error: 'There was an error fetching message history. Please try again' });
	}
};

// Export Controllers Functions to Router
module.exports = { createMessage, getMessages };
