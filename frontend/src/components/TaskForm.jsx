import React, { useState, useEffect } from 'react';
import { createTask, updateTask, fetchTask } from '../utils/api';

const TaskForm = ({ taskId, onSuccess }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (taskId) {
      const loadTask = async () => {
        const { data } = await fetchTask(taskId);
        setTask(data);
      };
      loadTask();
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await updateTask(taskId, task);
      } else {
        await createTask(task);
      }
      alert(`Task ${taskId ? 'updated' : 'created'} successfully!`);
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Failed to save the task!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{taskId ? 'Edit Task' : 'Create Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="border p-2 mb-4 w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="border p-2 mb-4 w-full"
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="border p-2 mb-4 w-full"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        {taskId ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default TaskForm;
