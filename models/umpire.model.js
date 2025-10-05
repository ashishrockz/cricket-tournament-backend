const mongoose = require("mongoose");

const umpireSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  type: { type: String, enum: ["user", "guest"], default: "guest" }
}, { timestamps: true });

module.exports = mongoose.model("Umpire", umpireSchema);
