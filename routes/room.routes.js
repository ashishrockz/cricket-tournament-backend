const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");
const auth = require("../middlewares/auth.middleware");

// create room (if user authenticated or for local rooms guest allowed)
router.post("/", authOptional, roomController.createRoom); // we'll define authOptional below
router.get("/", roomController.listRooms);
router.get("/:id", roomController.getRoom);
router.put("/:id", authOptional, roomController.updateRoom);
router.delete("/:id", authOptional, roomController.deleteRoom);

// helper to allow optional auth
function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return next();
  const auth = require("../middlewares/auth.middleware");
  return auth(req, res, (err) => next());
}

module.exports = router;
