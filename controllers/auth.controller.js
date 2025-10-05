const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password, displayName, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username & password required" });
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username taken" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, displayName, role });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, username: user.username, displayName: user.displayName, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username & password required" });
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, username: user.username, displayName: user.displayName, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
