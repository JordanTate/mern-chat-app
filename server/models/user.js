// Packages
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// User Sign-Up Method
userSchema.statics.signUp = async function (username, email, password) {

    // Validation
    if (!username || !email || !password) throw Error('Please ensure that all fields have been filled out correctly');

    // Check if User already Exists
    const userExists = await this.findOne({ username });

    if (userExists) throw Error('Username already exists. Please try again or login.');

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and Return User
    const user = await this.create({ username, email, password: hash });

    return user;
};

// User Login Method
userSchema.statics.login = async function (username, password) {

    // Check User Exists within Database
    const user = await this.findOne({ username });

    if (!user) throw Error('Invalid credentials. Please check your details are correct and try again.');

    // Password Validation
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw Error('Invalid credentials. Please check your details are correct and try again.');

    // Return User is checks have passed
    return user;
};

// Export User Schema as Model
module.exports = mongoose.model('User', userSchema);
