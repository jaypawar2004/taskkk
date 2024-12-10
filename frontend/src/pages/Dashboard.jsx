import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setIsCreating(!isCreating)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isCreating ? 'Cancel' : 'Create New Task'}
      </button>
      {isCreating ? <TaskForm onSubmit={(task) => alert('Submit functionality')} /> : <TaskList />}
    </div>
  );
};

export default Dashboard;
