const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Knockout","League"], default: "League" },
  city: String,
  venue: String,
  startDate: Date,
  endDate: Date,
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Tournament", tournamentSchema);
