const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Make sure this file exists

router.post("/user", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Create new user
    const newUser = await User.create({ name, email, password, age });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// ✅ Get all users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Fix `module.exports`
module.exports = router;
