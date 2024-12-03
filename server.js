import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes.js';
import seatRoutes from './routes/seatRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('Error:', error);
});     

app.use(express.json()); // Add this line to parse JSON request bodies

app.use('/api/booking', bookingRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/users', userRoutes);