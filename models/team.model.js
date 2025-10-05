const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  players: [{ name: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
