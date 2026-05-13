const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

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
    const { name, email, password } =
      req.body;

    // Check Existing User
    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    // Generate Token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message:
        "Account created successfully",

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
      message: error.message,
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    // Find User
    const user = await User.findOne({
      email,
    }).select("+password");

    // Check User
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Check Active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Account is deactivated",
      });
    }

    // Generate Token
    const token = generateToken(user._id);

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
      message: error.message,
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

module.exports = {
  register,
  login,
  getMe,
};