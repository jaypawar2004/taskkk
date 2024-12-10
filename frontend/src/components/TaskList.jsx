import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/tasks?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Task List</h2>
      <div className="bg-white rounded shadow">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">
                  <Link to={`/tasks/${task._id}`} className="text-blue-600 mr-2">
                    View
                  </Link>
                  <button
                    onClick={() => alert('Delete functionality')}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="mr-2 px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
