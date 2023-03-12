// Packages
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/user');

// ---------- JWT Functions ---------- //

// Create Token
const createToken = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Verify Token
const verifyToken = async (req, res, next) => {

	// Retrieve Token from Request Header
	const { authorization } = req.headers;

	// Validation
	if (!authorization) return res.status(400).json({ error: 'Invalid Authorization.' });

	try {
		// Retrieve ID from Token
		const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);

		// Find User by ID
		req.user = await User.findOne({ _id }).select('_id');

		return next();
	} catch (error) {
		return res.status(401).json({ error: 'Request Not Authorized.' });
	}
};

// Export JWT Functions
module.exports = { createToken, verifyToken };
