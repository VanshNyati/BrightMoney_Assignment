const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');
const billRoutes = require('./routes/BillRoutes');
const errorHandler = require('./middlewares/ErrorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://brightmoney-assignment.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/bills', billRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
