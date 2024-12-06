import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.endsWith('@clark.edu.in')) {
      alert('Email must end with @clark.edu.in');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>New here? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;