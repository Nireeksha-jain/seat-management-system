import express from 'express';
import {
    addNewBooking,
    getAllBookings,
    deleteBookingById,
    getBookingsByUserId,
    getBookingsByDate
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', addNewBooking);
router.get('/', getAllBookings);
router.delete('/:id', deleteBookingById);
router.get('/user/:userId', getBookingsByUserId);
router.get('/date/:date', getBookingsByDate);

export default router;