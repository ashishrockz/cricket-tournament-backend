const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authMiddleware, adminOnly } = require("../middlewares/auth.middleware");

router.get("/dashboard", authMiddleware, adminOnly, adminController.getDashboard);
router.get("/users", authMiddleware, adminOnly, adminController.listUsers);

module.exports = router;
