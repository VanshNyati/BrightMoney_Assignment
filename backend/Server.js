const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');
const billRoutes = require('./routes/BillRoutes');
const errorHandler = require('./middlewares/ErrorHandler');
// Load environment variables
dotenv.config();
const allowedOrigins = ['*'];

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(express.json());

// Routes
app.use('/api/bills', billRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
