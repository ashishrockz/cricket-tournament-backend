const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  displayName: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "umpire"], default: "user" },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
