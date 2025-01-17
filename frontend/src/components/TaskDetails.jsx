import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/tasks/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTask();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);
// Loading Task
  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <div className="mt-4">
        <button
          onClick={() => updateStatus('completed')}
          className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => navigate(`/dashboard`)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
