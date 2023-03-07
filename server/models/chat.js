// Packages
const mongoose = require('mongoose');

// Define Chat Schema
const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// Export Chat Schema as Model
module.exports = mongoose.model('Chat', chatSchema);
