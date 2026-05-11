const express = require("express");
const { body } = require("express-validator");

const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/career.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const router = express.Router();

// Public Routes
router.get("/jobs", getJobs);

router.get("/jobs/:id", getJobById);

router.post(
  "/apply",
  [body("jobId").notEmpty(), body("name").notEmpty(), body("email").isEmail()],
  validate,
  applyForJob,
);

// Admin Routes
router.post("/jobs", protect, adminOnly, createJob);

router.put("/jobs/:id", protect, adminOnly, updateJob);

router.delete("/jobs/:id", protect, adminOnly, deleteJob);

router.get("/applications", protect, adminOnly, getApplications);

router.patch(
  "/applications/:id/status",
  protect,
  adminOnly,
  updateApplicationStatus,
);

module.exports = router;
