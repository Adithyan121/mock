const express = require('express');
const mongoose = require('mongoose');
const itemRoute = require('./route/itemsRoute')
const userRoute = require('./route/userRoutes')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mock');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/crud',itemRoute)
app.use('/auth',userRoute)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

