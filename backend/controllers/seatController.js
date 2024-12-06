import * as seatService from '../services/seatService.js';

// Add a new seat
export const addNewSeat = async (req, res) => {
    try {
        const seatDto = req.body;
        const newSeat = await seatService.addNewSeat(seatDto);
        res.status(201).json(newSeat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all seats
export const getAllSeats = async (req, res) => {
    try {
        const seats = await seatService.getAllSeats();
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get seat by ID
export const getSeatById = async (req, res) => {
    try {
        const { seatId } = req.params;
        console.log(seatId);
        const seat = await seatService.getSeatById(seatId);
        res.status(200).json(seat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete seat by ID
export const deleteSeatById = async (req, res) => {
    try {
        const { seatId } = req.params;
        await seatService.deleteSeatById(seatId);
        res.status(200).json({ message: 'Seat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};