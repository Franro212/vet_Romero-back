import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes

import router from './routes/routes';
app.use('/api', router)


// Connect to MongoDB
connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
