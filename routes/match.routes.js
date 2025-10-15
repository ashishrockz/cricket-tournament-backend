const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");
const { authMiddleware, adminOnly } = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, matchController.createMatchForRoom);
router.post("/toss", matchController.saveToss);
// Start Innings
router.post("/innings/start", matchController.startInnings);
router.post("/record-ball", authOptional,matchController.recordBall); // umpires could be guests for local matches
router.get("/:id", matchController.getMatch);
router.post("/end", authMiddleware, matchController.endMatch);

function authOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return next();
  const authMiddleware = require("../middlewares/auth.middleware");
  return authMiddleware(req, res, (err) => next());
}

module.exports = router;
