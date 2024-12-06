import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  seatNumber: String,
  date: String,
  fromTime: String,
  toTime: String,
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;