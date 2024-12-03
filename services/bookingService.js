import Booking from '../models/Booking.js';
import Seat from '../models/Seat.js';
import User from '../models/User.js';
import BookingDto from '../dtos/BookingDto.js';
import BookingResponse from '../utils/BookingResponse.js';

// Create a new booking
export const createNewBooking = async (bookingBody) => {
    const { date, seatId, userId } = bookingBody;
    console.log('Booking request:', bookingBody); // Debugging statement
    const seat = await Seat.findOne({seatId});
    console.log('Seat:', seat); // Debugging statement
    const user = await User.findById(userId);
    console.log('User:', user); // Debugging statement

    if (!seat || !user) {
        throw new Error('Seat or User not found');
    }

    const isSeatBooked = await Booking.countDocuments({ seatId, date });
    if (isSeatBooked > 0) {
        return new BookingResponse(0, "This seat was already taken.");
    }

    const isUserBooked = await Booking.countDocuments({ userId, date });
    if (isUserBooked > 0) {
        return new BookingResponse(0, "You already made booking for this date.");
    }

    const newBooking = new Booking({ date, seatId, userId });
    await newBooking.save();

    
    const bookingDetails = {
        date: newBooking.date,
        seatId: newBooking.seatId,
        userName: `${user.firstName} ${user.lastName}`,
        clarkId: user.clarkId,
        email: user.email,
        phoneNumber: user.phoneNumber,
        seatName: seat.name,
        userId: newBooking.userId
    };

    return new BookingResponse(1, "Congratulations! Booking is successful!", bookingDetails);
};

// Get all bookings
export const getAllBooking = async () => {
    const bookings = await Booking.find();
    return bookings.map(booking => new BookingDto(
        booking._id,
        booking.date,
        booking.isActive,
        booking.seatId, // Just return the string value
        booking.userId
    ));
};

// Delete a booking by ID
export const deleteBookingById = async (id) => {
    await Booking.findByIdAndDelete(id);
};

// Get all bookings by user
export const getAllBookingByUser = async (userId) => {
    const bookings = await Booking.find({ userId })
    console.log('Bookings:', bookings); // Debugging statement
    return bookings.map(booking => new BookingDto(
        booking._id,
        booking.date,
        booking.isActive,
        booking.seatId,
        booking.userId
    ));
};


// Get all bookings by date
export const getAllBookingByDate = async (date) => {
    const bookings = await Booking.find({ date });
    return bookings.map(booking => new BookingDto(booking._id, booking.date, booking.isActive, booking.seatId, booking.userId));
};