const express = require("express");
const {
  getDashboard,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/admin.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

// Admin Middleware
router.use(protect, adminOnly);

// Routes
router.get("/dashboard", getDashboard);

router.get("/users", getUsers);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
