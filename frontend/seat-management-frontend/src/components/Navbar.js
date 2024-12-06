import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ onShowUpcoming, onShowPast }) => {
  const [firstName, setFirstName] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Seat Management System</Link>
      </div>
      <div className="navbar-right">
        <button className="navbar-btn" onClick={onShowUpcoming}>Upcoming Bookings</button>
        <button className="navbar-btn" onClick={onShowPast}>Past Bookings</button>
        <button className="navbar-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;