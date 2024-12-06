import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './Booking.css';
const Booking = () => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { seat, date: initialDate } = location.state;

  const handleBooking = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/bookings", {
        userId: "60d0fe4f5311236168a109ca", // Replace with actual user ID
        seatNumber: seat.number,
        date,
        fromTime,
        toTime,
      });
      navigate("/confirmation");
    } catch (error) {
      console.error("Error booking seat:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!seat) {
    return <div className="loading">Loading...</div>; // Show a loading message if seat is not available
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2>Booking Seat: {seat.number} on {date}</h2>
      <form>
        <input
          type="date"
          value={date || initialDate}
          min={today} // Disable previous dates
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="From Time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
        />
        <input
          type="time"
          placeholder="To Time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button onClick={handleBooking} disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
