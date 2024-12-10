import axios from 'axios';

fetch('http://localhost:5000/api/register', {
  method: 'POST', // Change this to POST
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('User registered:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Axios instance with base URL
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add JWT token to requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Token localStorage se retrieve karo
  if (token) req.headers.Authorization = `Bearer ${token}`; // Authorization header set karo
  return req;
}, (error) => {
  return Promise.reject(error); // Error ko handle karo
});

// Test Backend Connection
fetch('http://localhost:5000/api/test')
  .then((response) => {
    if (!response.ok) throw new Error('Failed to connect to the backend');
    return response.json();
  })
  .then((data) => {
    console.log(data.message); // Backend connection success message
  })
  .catch((error) => {
    console.error('Error connecting to backend:', error.message);
  });

// LocalStorage se token ko retrieve karo
const token = localStorage.getItem('token');

// Task Create with Fetch
fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Token ko authorization header me pass karo
  },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description',
    dueDate: '2024-12-20', // Task details
  }),
})
  .then((response) => {
    if (!response.ok) throw new Error('Task creation failed'); // HTTP error handle karo
    return response.json();
  })
  .then((data) => {
    console.log('Task created successfully:', data); // Task creation success response
  })
  .catch((error) => {
    console.error('Error creating task:', error.message); // Error handling
  });

// API Requests for Authentication and Task Management
export const login = (formData) => API.post('/auth/login', formData);

export const register = async (formData) => {
  try {
    const response = await API.post('/auth/register', formData); // Correct route
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw error;
  }
  
};


export const createTask = (task) => API.post('/tasks', task);
export const fetchTasks = (page) => API.get(`/tasks?page=${page}`);
export const fetchTask = (id) => API.get(`/tasks/${id}`);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
