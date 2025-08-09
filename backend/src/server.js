import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory path



// Middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend    
    })
  );
}


app.use(express.json()); // Middleware to parse JSON bodies
// app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"../frontend/dist"))); // Serve static files from the frontend build directory

    app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html")); // Serve the index.html file for all other routes
});
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Server is running on port PORT:', PORT);
 });
});

