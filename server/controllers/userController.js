// User Model
const User = require('../models/user');

// JWT Config Functions
const { createToken } = require('../config/jwt.config');

// ---------- Controller Functions ---------- //

// User Registration
const userSignUp = async (req, res) => {

    // Get User Details from Request
    const { username, email, password } = req.body;

    try {
        // Create User
        const user = await User.signUp(username, email, password);

        // Create Token
        const token = createToken(user._id);

        // Return Token to Client
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Authenticate User
const userLogin = async (req, res) => {

    // Get User Details from Request
    const { username, password } = req.body;

    try {
        // Validate User
        const user = await User.login(username, password);

        // Create Token
        const token = createToken(user._id);

        // Return Token to Client
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export Controller Functions
module.exports = { userSignUp, userLogin };
