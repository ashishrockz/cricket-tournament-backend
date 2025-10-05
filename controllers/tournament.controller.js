const Tournament = require("../models/tournament.model");

exports.createTournament = async (req, res) => {
  try {
    const body = req.body;
    const t = await Tournament.create({ ...body, createdBy: req.user._id });
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listTournaments = async (req, res) => {
  try {
    const list = await Tournament.find().sort({ startDate: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTournament = async (req, res) => {
  try {
    const t = await Tournament.findById(req.params.id).populate("matches");
    if (!t) return res.status(404).json({ message: "Tournament not found" });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
