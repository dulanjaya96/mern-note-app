import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend    
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port PORT:', PORT);
 });


