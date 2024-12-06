import React from "react";
import axios from "axios";
import "./BookingList.css";

const BookingList = ({ bookings = [], onCancelBooking }) => {
  console.log('Bookings to display:', bookings);

  const handleCancel = async (bookingId, seatNumber, date) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:4000/bookings/cancel`, {
          bookingId,
          seatNumber,
          date,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onCancelBooking(bookingId); // Update bookings after cancellation
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    }
  };

  return (
    <div>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              Seat Number: {booking.seatNumber}, Date: {booking.date}, From: {booking.fromTime}, To: {booking.toTime}
              <button onClick={() => handleCancel(booking._id, booking.seatNumber, booking.date)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
