import React, { useEffect, useState } from 'react';
import { fetchTask, updateTask } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      const { data } = await fetchTask(id);
      setTask(data);
    };
    loadTask();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      await updateTask(id, { ...task, status: task.status === 'pending' ? 'completed' : 'pending' });
      setTask((prev) => ({ ...prev, status: prev.status === 'pending' ? 'completed' : 'pending' }));
      alert('Task status updated!');
    } catch (error) {
      alert('Failed to update status!');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto border rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
        <p className="mb-2"><strong>Description:</strong> {task.description}</p>
        <p className="mb-2"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="mb-4"><strong>Status:</strong> {task.status}</p>
        <button onClick={handleStatusChange} className="bg-green-500 text-white px-4 py-2">
          Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
        </button>
        <button onClick={() => navigate('/tasks')} className="bg-gray-500 text-white px-4 py-2 ml-4">
          Back to Tasks
        </button>
      </div>
    </>
  );
};

export default TaskDetails;
