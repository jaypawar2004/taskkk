import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../utils/api';
import TaskCard from '../components/TaskCard';
import Navbar from '../components/Navbar';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      const { data } = await fetchTasks(page);
      setTasks(data);
    };
    loadTasks();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        <div>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={() => setPage(page - 1)} disabled={page === 0} className="bg-gray-300 px-3 py-1 rounded">Previous</button>
          <button onClick={() => setPage(page + 1)} className="bg-gray-300 px-3 py-1 rounded">Next</button>
        </div>
      </div>
    </>
  );
};

export default Tasks;
