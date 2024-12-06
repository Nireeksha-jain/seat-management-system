import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import seatRoutes from "./routes/seats.js";
import bookingRoutes from "./routes/bookings.js";
import protectedRoutes from "./routes/protected.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('Error:', error);
});     

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/seats", seatRoutes);
app.use("/bookings", bookingRoutes);
