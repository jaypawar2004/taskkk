import React, { useState } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2 mb-4 w-full" required />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border p-2 mb-4 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
