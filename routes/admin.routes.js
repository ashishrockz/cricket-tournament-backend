const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");

router.get("/dashboard", auth, adminOnly, adminController.getDashboard);
router.get("/users", auth, adminOnly, adminController.listUsers);

module.exports = router;
