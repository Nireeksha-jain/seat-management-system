import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [seats, setSeats] = useState([]);
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:4000/seats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeats(data);
      } catch (error) {
        console.error('Error fetching seats:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchSeats();
  }, [navigate]);

  useEffect(() => {
    if (date) {
      const fetchBookings = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(`http://localhost:4000/bookings/date/${date}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBookings(data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      fetchBookings();
    }
  }, [date]);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    setShowBookingModal(true);
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const bookingData = {
        userId,
        seatNumber: selectedSeat.number,
        date,
        fromTime,
        toTime,
      };
      const { data } = await axios.post('http://localhost:4000/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowBookingModal(false);
      setBookings([...bookings, data]); // Update bookings state with the response data
      navigate('/confirmation', { state: { booking: data } });

      // Fetch updated seats to reflect the booking status
      const updatedSeats = await axios.get('http://localhost:4000/seats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeats(updatedSeats.data);
    } catch (error) {
      console.error('Error booking seat:', error);
    }
  };

  const isSeatBooked = (seatNumber) => {
    return bookings.some(
      (booking) => booking.seatNumber === seatNumber
    );
  };

  const today = new Date().toISOString().split('T')[0];

  const zones = [
    { id: 1, name: 'Quiet Reading Zone', type: 'rows', start: 0, end: 19 },
    { id: 2, name: 'Group Study Zone', type: 'round-tables', start: 20, end: 39 },
    { id: 3, name: 'Computer Workstations', type: 'computers', start: 40, end: 59 },
  ];

  return (
    <div>
      <h1>Library Seat Layout</h1>
      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
      />
      {date && (
        <>
          {zones.map((zone) => (
            <div className="library-zone" key={zone.id}>
              <h2 className="zone-title">{zone.name}</h2>
              <div className="seat-layout">
                {zone.type === 'rows' &&
                  seats.slice(zone.start, zone.end + 1).map((seat) => (
                    <div
                      key={seat.number}
                      className={`seat ${isSeatBooked(seat.number) ? 'booked' : 'available'}`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.number}
                    </div>
                  ))}
                {zone.type === 'round-tables' &&
                  Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="round-table">
                      {seats.slice(zone.start + i * 4, zone.start + (i + 1) * 4).map((seat) => (
                        <div
                          key={seat.number}
                          className={`seat ${isSeatBooked(seat.number) ? 'booked' : 'available'}`}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {seat.number}
                        </div>
                      ))}
                    </div>
                  ))}
                {zone.type === 'computers' &&
                  seats.slice(zone.start, zone.end + 1).map((seat) => (
                    <div
                      key={seat.number}
                      className={`computer ${isSeatBooked(seat.number) ? 'booked' : 'available'}`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      <span>{seat.number}</span>
                      <FontAwesomeIcon icon={faLaptop} size="2x" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      )}
      <Modal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book Seat ${selectedSeat?.number}`}
      >
        <div>
          <p>Date: {date}</p>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            placeholder="From Time"
          />
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            placeholder="To Time"
          />
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;