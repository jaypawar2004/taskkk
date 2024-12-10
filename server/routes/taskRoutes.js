const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create Task
router.post('/', protect, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = await Task.create({ 
            title, description, dueDate, priority, assignedTo: req.user.id 
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch All Tasks
router.get('/', protect, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const tasks = await Task.find({ assignedTo: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Other routes: Edit, Delete, Update Status
module.exports = router;
