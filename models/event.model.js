const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
  over: Number,
  ballInOver: Number,
  batsman: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bowler: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  run: Number,
  extras: { type: String, default: "" },
  wicket: { type: Boolean, default: false },
  wicketType: { type: String, default: "" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
