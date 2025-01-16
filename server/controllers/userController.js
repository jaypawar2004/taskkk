const User = require('../models/User');
const Task = require('../models/Task');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user's details...
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete tasks assigned to this user
    await Task.deleteMany({ assignedTo: id });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a task to a user...
exports.assignTask = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { taskId, userId } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignedTo: userId },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

