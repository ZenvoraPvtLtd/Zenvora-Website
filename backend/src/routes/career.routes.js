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

const { protect, optionalAuth, adminOnly } = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const router = express.Router();

// Public Routes
router.get("/jobs", optionalAuth, getJobs);

router.get("/jobs/:id", getJobById);

router.post(
  "/apply",
  [
    body("name").trim().notEmpty(),
    body("email").trim().isEmail(),
    body().custom((value) => {
      if (value.jobId || value.track) return true;
      throw new Error("jobId or track is required");
    }),
  ],
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
  [body("status").isIn(["pending", "reviewed", "accepted", "rejected"])],
  validate,
  updateApplicationStatus,
);

module.exports = router;
