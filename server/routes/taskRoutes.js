// taskRoutes.js (example)
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Middleware ko import karo
const { createTask, getTasks } = require('../controllers/taskController');

// Protect the task creation route with the authentication middleware
router.post('/tasks', authenticate, createTask);  // Only authenticated users can create tasks
router.get('/', authenticate, getTasks);

module.exports = router;
