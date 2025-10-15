const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser
} = require("../controllers/auth.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/update-profile", authMiddleware, updateUserProfile);

// Admin routes
router.get("/all", authMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, adminOnly, getUserById);
router.delete("/delete/:id", authMiddleware, adminOnly, deleteUser);

module.exports = router;
