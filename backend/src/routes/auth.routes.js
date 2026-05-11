const express = require("express");
const { body } = require("express-validator");

const { register, login, getMe } = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validate,
  register,
);

// Login
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  login,
);

// Current User
router.get("/me", protect, getMe);

module.exports = router;
