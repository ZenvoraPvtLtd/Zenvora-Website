const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { sendWelcomeEmail, sendLoginNotification } = require("../utils/email");

// ================= GENERATE TOKEN =================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check Existing User
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please log in or use a different email.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
      provider: "local",
    });

    // Generate Token
    const token = generateToken(user._id);

    // Send welcome email asynchronously
    sendWelcomeEmail(user).catch((err) => {
      console.error("Failed to send welcome email:", err);
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find User
    const user = await User.findOne({
      email,
    }).select("+password");

    // Check User
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Generate Token
    const token = generateToken(user._id);

    // Send login notification asynchronously
    sendLoginNotification(user).catch((err) => {
      console.error("Failed to send login notification:", err);
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// ================= GET CURRENT USER =================

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// ================= OAUTH CALLBACK =================

const oauthCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL;

    // Send login notification for OAuth
    sendLoginNotification(user).catch((err) => {
      console.error("Failed to send login notification:", err);
    });

    const params = new URLSearchParams({
      token,
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res.redirect(`${clientUrl}/login?${params.toString()}`);
  } catch (error) {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
};

module.exports = {
  register,
  login,
  getMe,
  oauthCallback,
};