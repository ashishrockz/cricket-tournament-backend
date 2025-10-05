const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  toss: {
    winner: String,
    choice: String // "bat" or "bowl"
  },
  currentInnings: {
    battingTeam: String,
    bowlingTeam: String,
    overs: { type: Number, default: 0 }
  },
  score: { type: Object, default: {} },
  winner: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);
