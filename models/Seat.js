import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    seatId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;