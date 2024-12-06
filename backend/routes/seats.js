import express from "express";
import Seat from "../models/Seat.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get Seats
router.get('/', auth, async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Initialize Seats
router.post("/initialize", auth, async (req, res) => {
  const { count } = req.body; // Get the count from the request body
  const seats = [];
  for (let i = 1; i <= count; i++) {
    seats.push(new Seat({ number: `S${i}` }));
  }
  await Seat.insertMany(seats);
  res.send(`${count} Seats Initialized`);
});

export default router;