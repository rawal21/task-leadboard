const express = require("express");
const router = express.Router();
const User = require("../models/UserModels");
const PointsHistory = require("../models/PointHistory.js");

// Create Sample user routes 
router.post('/create-users', async (req, res) => {
  const users = [
    { name: 'Rahul' },
    { name: 'Kamal' },
    { name: 'Sanaki' },
    { name: 'Sumit' },
    { name: 'Ysh' },
    { name: 'user 6' },
    { name: 'User 7' },
    { name: 'User 8' },
    { name: 'User 9' },
    { name: 'User 10' }
  ];
  try {
    const createUser = await User.insertMany(users);
    res.status(201).json(createUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating users", error: err });
  }
});

// Get all users sorted by points
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// Claim points for a user
router.post('/claim-points', async (req, res) => {
  const { userId } = req.body;

  try {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points += randomPoints;
    await user.save();

    // Log the points history
    const pointsLog = new PointsHistory({
      userId: user._id,
      points: randomPoints,
      claimedAt: new Date() // Ensure this field is captured
    });
    await pointsLog.save();

    const updatedUsers = await User.find().sort({ points: -1 });
    res.json({
      message: `${user.name} claimed ${randomPoints} points`,
      updatedUsers,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error claiming points', error: err });
  }
});

// Get points history for a specific user
router.get('/:userId/points-history', async (req, res) => {
  const { userId } = req.params;

  try {
    const pointsHistory = await PointsHistory.find({ userId }).sort({ claimedAt: -1 });
    res.json(pointsHistory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching points history', error: err });
  }
});

// Add a new user
router.post('/add', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const newUser = new User({ name, points: 0 });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error adding user', error: err });
  }
});

module.exports = router;
