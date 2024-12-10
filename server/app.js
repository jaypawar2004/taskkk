const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');  // Ensure these files exist
const taskRoutes = require('./routes/taskRoutes');  // Ensure these files exist

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello Dosto!');
});


// API Routes
app.use('/api/register', userRoutes);  // Updated the route
app.use('/api/auth', authRoutes);  // Ensure this route is defined
app.use('/api/tasks', taskRoutes);  // Ensure this route is defined

// Export the app
module.exports = app;
