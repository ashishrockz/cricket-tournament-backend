const Room = require("../models/room.model");
const Team = require("../models/team.model");
const { nanoid } = require("nanoid");

// Create a room - rules:
// - If isTournament == true -> ownerId must exist (authenticated client should pass).
// - If local match -> ownerId optional; guest umpire allowed.
exports.createRoom = async (req, res) => {
  try {
    const payload = req.body;
    // If tournament, require authentication or ownerId
    if (payload.isTournament && !req.user && !payload.ownerId) {
      return res.status(401).json({ message: "Login required to create tournament room" });
    }

    const roomId = `ROOM-${nanoid(6)}`;
    const inviteCode = nanoid(6).toUpperCase();

    const roomData = {
      roomId,
      ownerId: payload.isTournament ? (req.user ? req.user._id : payload.ownerId) : (req.user ? req.user._id : null),
      ownerName: payload.ownerName || (req.user ? req.user.username : "Guest"),
      umpire: payload.umpire || null,
      isTournament: !!payload.isTournament,
      tournamentId: payload.tournamentId || null,
      inviteCode,
      maxPlayersPerTeam: payload.maxPlayersPerTeam || 11
    };

    const room = await Room.create(roomData);

    if (payload.teams && payload.teams.length) {
      for (const t of payload.teams) {
        const team = await Team.create({ teamName: t.teamName, players: t.players || [], roomId: room._id });
        room.teams.push(team._id);
      }
      await room.save();
    }

    res.status(201).json({ message: "Room created", room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const { id } = req.params; // roomId
    const room = await Room.findOne({ roomId: id }).populate("teams");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("teams").sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const room = await Room.findOneAndUpdate({ roomId: id }, updates, { new: true });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findOneAndDelete({ roomId: id });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
