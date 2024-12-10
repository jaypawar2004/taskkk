import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className={`border-l-4 p-4 mb-4 ${task.priority === 'high' ? 'border-red-500' : task.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'}`}>
      <h2 className="text-lg font-bold">{task.title}</h2>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <Link to={`/tasks/${task._id}`} className="text-blue-600 underline">View Details</Link>
    </div>
  );
};

export default TaskCard;
