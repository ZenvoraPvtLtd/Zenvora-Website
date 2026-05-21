const express = require("express");
const { body } = require("express-validator");
const passport = require("../config/passport");

const { register, login, getMe, oauthCallback, googleLogin } = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");


const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone").optional({ checkFalsy: true }).matches(/^[0-9+\-\s()]{7,18}$/),
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

// Google OAuth
router.post("/google", googleLogin);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`, session: false }), oauthCallback);

// Microsoft OAuth
router.get("/microsoft", passport.authenticate("microsoft", { session: false }));
router.get("/microsoft/callback", passport.authenticate("microsoft", { failureRedirect: `${process.env.CLIENT_URL}/login?error=microsoft_failed`, session: false }), oauthCallback);

module.exports = router;
