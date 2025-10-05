const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournament.controller");
const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");

router.post("/", auth, adminOnly, tournamentController.createTournament);
router.get("/", tournamentController.listTournaments);
router.get("/:id", tournamentController.getTournament);

module.exports = router;
