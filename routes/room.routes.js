const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");

// Allow auth but not required (for local matches)
function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return next();
  const auth = require("../middlewares/auth.middleware");
  return auth(req, res, (err) => next());
}

// 🔹 Create room (Auth optional)
router.post("/", authOptional, roomController.createRoom);

// 🔹 Join room by invite code (guest or authenticated)
router.post("/join", authOptional, roomController.joinRoom);

// 🔹 Get all rooms
router.get("/", roomController.listRooms);

// 🔹 Get single room by roomId
router.get("/:id", roomController.getRoom);

// 🔹 Update room
router.put("/:id", authOptional, roomController.updateRoom);

// 🔹 Delete room
router.delete("/:id", authOptional, roomController.deleteRoom);

module.exports = router;
