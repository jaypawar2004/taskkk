import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add JWT token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = token;
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const createTask = (task) => API.post('/tasks', task);
export const fetchTasks = (page) => API.get(`/tasks?page=${page}`);
export const fetchTask = (id) => API.get(`/tasks/${id}`);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
