// Configure Enviromental Variables
require('dotenv').config();

// Packages
const express = require('express');
const mongoose = require('mongoose');

// Set Express App
const app = express();

// Middleware
app.use(express.json());

// Route Handlers
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Configure Port
const PORT = process.env.PORT || 3001;

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Listen
        app.listen(PORT, () => {
            console.log(`Connected to Database. Servier listening on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
