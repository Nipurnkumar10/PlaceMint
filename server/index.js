const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// Routes
app.use('/api/questions', require('./routes/questions'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/experiences', require('./routes/experiences'));

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('MongoDB Connection Error:', err));
} else {
    console.warn('MONGO_URI not found in environment variables. Database connection skipped.');
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
