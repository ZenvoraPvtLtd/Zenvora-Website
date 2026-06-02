const express = require("express");
const {
  getDashboard,
  getUsers,
  updateUser,
  deleteUser,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getActivity,
  getRecentActivities,
} = require("../controllers/admin.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

// Admin Middleware
router.use(protect, adminOnly);

// Routes
router.get("/dashboard", getDashboard);
router.get("/activity", getActivity);
router.get("/activities", getRecentActivities);

router.get("/users", getUsers);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

// Admin Management Routes
router.get("/admins", getAdmins);

router.post("/admins", createAdmin);

router.patch("/admins/:id", updateAdmin);

router.delete("/admins/:id", deleteAdmin);

module.exports = router;
