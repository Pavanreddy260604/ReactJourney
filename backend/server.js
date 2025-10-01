// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
mongoose.connect(process.env.MAN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// --------------------
// Schemas & Models
// --------------------

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Item Schema
const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: String,
  why: { title: String, points: [String] },
  examples: [{ title: String, code: String }],
  best: { title: String, points: [String], conclusion: String },
  path: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Item = mongoose.model('Item', itemSchema);

// --------------------
// Routes
// --------------------

// Test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// --------------------
// Users
// --------------------

// Get all users (for testing, no passwords)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register user
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ userId: newUser._id, name: newUser.name, email: newUser.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    res.json({ userId: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------
// Items
// --------------------

// 1️⃣ Get all items (frontend can use for listing all topics)
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 2️⃣ Get items for a specific user
app.get('/api/items/user/:userId', async (req, res) => {
  try {
    const items = await Item.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 3️⃣ Get single item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Topic not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 4️⃣ Create a new item
app.post('/api/items', async (req, res) => {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) return res.status(400).json({ message: 'userId and title are required' });

    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 5️⃣ DELETE item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Topic not found' });

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------------
// Catch-all 404
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));