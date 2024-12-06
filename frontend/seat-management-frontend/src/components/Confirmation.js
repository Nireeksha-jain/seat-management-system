import React from "react";
import { useLocation } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
  const { state } = useLocation(); // Use location state to get the booking data
  const { booking } = state || {}; // Destructure booking data

  if (!booking) {
    return <p>Booking data not found.</p>;
  }

  return (
    <div className="confirmation">
      <h2>Congratulations! Booking Successful!</h2>
      <div className="ticket">
        <h3>Your Booking Details:</h3>
        <p>Seat Number: {booking.seatNumber}</p>
        <p>Date: {booking.date}</p>
        <p>From: {booking.fromTime}</p>
        <p>To: {booking.toTime}</p>
      </div>
    </div>
  );
};

export default Confirmation;
