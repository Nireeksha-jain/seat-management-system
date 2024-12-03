import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    seatId: {
        type: String,
        ref: 'Seat',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;