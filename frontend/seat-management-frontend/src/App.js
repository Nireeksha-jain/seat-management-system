import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import BookingList from './components/BookingList';

const AppContent = () => {
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [showPastModal, setShowPastModal] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:4000/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched bookings:', data);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchAllBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(booking => booking._id !== bookingId));
  };

  const today = new Date().toISOString().split('T')[0];

  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      {isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar
          onShowUpcoming={() => setShowUpcomingModal(true)}
          onShowPast={() => setShowPastModal(true)}
        />
      )}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/booking" element={isAuthenticated ? <Booking /> : <Navigate to="/login" />} />
          <Route path="/confirmation" element={isAuthenticated ? <Confirmation /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Modal
        show={showUpcomingModal}
        onClose={() => setShowUpcomingModal(false)}
        title="Upcoming Bookings"
      >
        <BookingList bookings={bookings.filter(booking => new Date(booking.date) >= new Date(today))} onCancelBooking={handleCancelBooking} />
      </Modal>

      <Modal
        show={showPastModal}
        onClose={() => setShowPastModal(false)}
        title="Past Bookings"
      >
        <BookingList bookings={bookings.filter(booking => new Date(booking.date) < new Date(today))} onCancelBooking={handleCancelBooking} />
      </Modal>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;