const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api/bills', require('./routes/BillRoutes')); 

// Error handling middleware 
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
