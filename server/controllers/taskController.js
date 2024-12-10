const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = new Task({ title, description, dueDate, priority, assignedTo: req.user.id });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).limit(10).skip(req.query.page * 10);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

