// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mock', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Express route for handling login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Create and send JWT token
  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

// Middleware to verify JWT token
app.use(authMiddleware);

// Your other routes and middleware would go here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});