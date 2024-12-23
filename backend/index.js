import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connectDB.js';
import userRouter from './routes/user.router.js';
import bookRouter from './routes/book.js';
import cors from 'cors'


const app = express();


app.use(cors())
// Middleware
app.use(express.json());

// Dynamic Port Assignment
const PORT = process.env.PORT || 1000;

// Root Route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/user',Favourite)
app.use('/api/user',Cart)
app.use('/api/user',Order)

// Catch-All Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Server Initialization
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit process with failure
    });
