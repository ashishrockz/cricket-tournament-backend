const User = require("../models/user.model");
const Room = require("../models/room.model");
const Match = require("../models/match.model");

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const rooms = await Room.countDocuments();
    const matches = await Match.countDocuments();
    res.json({ users, rooms, matches });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").limit(200);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
