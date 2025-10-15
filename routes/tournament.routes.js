const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");
const { authMiddleware, adminOnly } = require("../middlewares/auth.middleware");


router.post("/", authMiddleware, adminOnly, tournamentController.createTournament);
router.get("/", tournamentController.listTournaments);
router.get("/:id", tournamentController.getTournament);

module.exports = router;
