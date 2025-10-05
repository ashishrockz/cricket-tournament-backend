const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  ownerName: { type: String },
  umpire: { name: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, type: { type: String, enum: ["user","guest"] } },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  isTournament: { type: Boolean, default: false },
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: false },
  status: { type: String, enum: ["pending", "live", "completed"], default: "pending" },
  inviteCode: { type: String },
  maxPlayersPerTeam: { type: Number, default: 11 }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
