// Packages
const mongoose = require('mongoose');

// Define Message Schema
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

// Export Message Schema as Model
module.exports = mongoose.models('Message', messageSchema);
