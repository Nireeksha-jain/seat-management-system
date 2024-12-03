import express from 'express';
import {
    addNewSeat,
    getAllSeats,
    getSeatById,
    deleteSeatById
} from '../controllers/seatController.js';

const router = express.Router();

router.post('/', addNewSeat);
router.get('/', getAllSeats);
router.get('/:seatId', getSeatById);
router.delete('/:seatId', deleteSeatById);

export default router;