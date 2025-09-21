const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to your ReactJourney database
mongoose.connect(process.env.MAN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define schema matching your 'items' collection
const itemSchema = new mongoose.Schema({
  title: String,
  intro: String,
  why: { title: String, points: [String] },
  examples: [{ title: String, code: String }],
  best: { title: String, points: [String], conclusion: String },
  path: String,
  id: String
});

// Create model for the 'items' collection
const Item = mongoose.model('Item', itemSchema, 'items'); // 3rd argument forces the collection name

// 1️⃣ Route to fetch all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find(); // get all items
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2️⃣ Route to fetch single item by path
app.get('/api/items/:path', async (req, res) => {
  try {
    const item = await Item.findOne({ path: req.params.path });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/items' ,async(req,res)=> {
    try{
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);

    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

app.listen(5000, () => console.log("Server running on port 5000"));
