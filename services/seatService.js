import Seat from '../models/Seat.js';
import SeatDto from '../dtos/SeatDto.js';

// Add a new seat
export const addNewSeat = async (seatDto) => {
    const { seatId, name, isActive } = seatDto;
    const newSeat = new Seat({ seatId: seatId, name, isActive });
    await newSeat.save();
    return new SeatDto(newSeat.seatId, newSeat.name, newSeat.isActive);
};

// Get all seats
export const getAllSeats = async () => {
    const seats = await Seat.find();
    return seats.map(seat => new SeatDto(seat.seatId, seat.name, seat.isActive));
};

// Get seat by ID
export const getSeatById = async (seatId) => {
    console.log('Querying seat with seatId:', seatId); // Debugging statement
    const seat = await Seat.findOne({seatId:seatId});
    if (!seat) {
        throw new Error('Seat not found');
    }
    return new SeatDto(seat.seatId, seat.name, seat.isActive);
};

// Delete seat by ID
export const deleteSeatById = async (seatId) => {
    await Seat.findOneAndDelete({seatId:seatId});
};