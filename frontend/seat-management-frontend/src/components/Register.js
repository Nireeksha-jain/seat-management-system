import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      alert(error.response.data);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;