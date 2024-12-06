import express from 'express';
import Booking from '../models/Booking.js';
import Seat from '../models/Seat.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Book a seat
router.post('/', auth, async (req, res) => {
  const { userId, seatNumber, date, fromTime, toTime } = req.body;
  console.log('Booking seat:', req.body);

  try {
    const booking = new Booking({ userId, seatNumber, date, fromTime, toTime });
    await booking.save();

    // Update the seat's isBooked status
    await Seat.updateOne({ number: seatNumber }, { isBooked: true });

    console.log('Booking successful:', booking);
    res.status(201).json(booking); // Return the booking data
  } catch (error) {
    console.error('Error booking seat:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get bookings for a specific date
router.get('/date/:date', auth, async (req, res) => {
  const { date } = req.params;
  try {
    const bookings = await Booking.find({ date });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get bookings for a specific user
router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  console.log('Fetching bookings for user:', userId);
  try {
    const bookings = await Booking.find({ userId });
    console.log('Fetched Bookings:', bookings)
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Cancel a booking
router.post('/cancel', auth, async (req, res) => {
  const { bookingId, seatNumber, date } = req.body;
  console.log('Cancelling booking:', req.body);

  try {
    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    // Update the seat's isBooked status
    await Seat.updateOne({ number: seatNumber }, { isBooked: false });

    console.log('Booking cancelled successfully');
    res.status(200).send('Booking cancelled successfully');
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;