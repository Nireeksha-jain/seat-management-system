import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: String,
  isBooked: { type: Boolean, default: false },
});

const Seat = mongoose.models.Seat || mongoose.model("Seat", seatSchema);
export default Seat;