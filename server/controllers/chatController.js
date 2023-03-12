// Models
const Chat = require('../models/chat');
const User = require('../models/user');

// ---------- Controller Function ---------- //

// Create New Chat
const createChat = async (req, res) => {
	// Fetch User Details from Request
	const { username, recipient: recipientUsername } = req.body;

	// Validate Users
	const user = await User.findOne({ username });
	const recipient = await User.findOne({ username: recipientUsername });

	if (!user || !recipient) return res.status(404).json({ error: 'There was an error finding Users. Please check you are logged in.' });

	try {
		// Create Chat
		const chat = await Chat.create({ users: [user._id, recipient._id] });

		// Return Chat
		return res.status(200).json(chat);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// Get all Chats
const getChats = async (req, res) => {
	// Get Username from Request
	const { username } = req.params;

	// Find User
	const user = await User.findOne({ username });

	// Validation
	if (!user) return res.status(404).json({ error: 'There was an error finding User. Please check you are logged in.' });

	try {
		// Find Chats
		const chats = await Chat.find({
			users: { $in: [user._id] },
		});

		// Return Chats
		return res.status(200).json(chats);
	} catch (error) {
		return res.status(400).json({ error: 'Unable to find chats. Please try again.' });
	}
};

// Export Controllers Functions to Router
module.exports = { createChat, getChats };
