const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.get('/', (req, res) => {
  res.send('User service is running');
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Please provide name, email, and password.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User with this email already exists.');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Please provide email and password.');
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send('Invalid credentials.');
    }

    // Check if password matches (In real app, use bcrypt to compare hash)
    // For now, assuming plain text as per original code, but should be hashed
    if (user.password !== password) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});

