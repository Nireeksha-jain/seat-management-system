import * as bookingService from '../services/bookingService.js';

// Add a new booking
export const addNewBooking = async (req, res) => {
    try {
        const bookingBody = req.body;
        const bookingResponse = await bookingService.createNewBooking(bookingBody);
        res.status(201).json(bookingResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBooking();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking by ID
export const deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        await bookingService.deleteBookingById(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bookings by user
export const getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Received userId:', userId); // Debugging statement
        const bookings = await bookingService.getAllBookingByUser(userId);
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error in getBookingsByUser:', error); // Debugging statement
        res.status(500).json({ message: error.message });
    }
};

// Get bookings by date
export const getBookingsByDate = async (req, res) => {
    try {
        const { date } = req.params; 
        const bookings = await bookingService.getAllBookingByDate(date);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

