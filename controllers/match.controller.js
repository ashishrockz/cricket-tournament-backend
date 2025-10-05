const Match = require("../models/match.model");
const Room = require("../models/room.model");
const Event = require("../models/event.model");

// 🏁 Create match record tied to a room
exports.createMatchForRoom = async (req, res) => {
  try {
    const { roomId, teamAId, teamBId } = req.body;
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const match = await Match.create({
      roomId: room._id,
      teamA: teamAId,
      teamB: teamBId,
      score: {},
      events: [],
      toss: {},
      currentInnings: {}
    });

    res.status(201).json({ message: "Match created", match });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🪙 Save Toss Details
exports.saveToss = async (req, res) => {
  try {
    const { matchId, winner, choice } = req.body;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.toss = { winner, choice };
    await match.save();

    res.json({ message: "Toss saved successfully", toss: match.toss });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏏 Start Innings
exports.startInnings = async (req, res) => {
  try {
    const { matchId, battingTeam, bowlingTeam } = req.body;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.currentInnings = { battingTeam, bowlingTeam, overs: 0 };
    await match.save();

    res.json({
      message: "Innings started successfully",
      currentInnings: match.currentInnings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏃 Record a Ball (Ball-by-Ball Updates)
exports.recordBall = async (req, res) => {
  try {
    const {
      matchId,
      over,
      ballInOver,
      batsman,
      bowler,
      run = 0,
      wicket = false,
      wicketType = "",
      extras = "",
      notes = ""
    } = req.body;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    // Create a new Event for this delivery
    const ev = await Event.create({
      matchId: match._id,
      over,
      ballInOver,
      batsman,
      bowler,
      run,
      extras,
      wicket,
      wicketType,
      notes
    });

    // Push event into match record
    match.events.push(ev._id);

    // Update score for current batting team
    const battingTeam = match.currentInnings?.battingTeam || "teamA";
    if (!match.score[battingTeam]) {
      match.score[battingTeam] = { runs: 0, wickets: 0, overs: 0 };
    }

    match.score[battingTeam].runs += run;
    if (wicket) match.score[battingTeam].wickets += 1;

    // Increment overs count when 6 balls are completed
    if (ballInOver === 6) {
      match.score[battingTeam].overs += 1;
      match.currentInnings.overs = match.score[battingTeam].overs;
    }

    await match.save();

    res.json({
      message: "Ball recorded successfully",
      event: ev,
      updatedScore: match.score[battingTeam]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Get Match Details
exports.getMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id).populate("events");
    if (!match) return res.status(404).json({ message: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏁 End Match
exports.endMatch = async (req, res) => {
  try {
    const { matchId, winner } = req.body;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.winner = winner;
    match.status = "completed";
    await match.save();

    res.json({ message: "Match ended successfully", match });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
