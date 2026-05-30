const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// Protect Route
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No Token",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// Optional Auth
const optionalAuth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    }
  } catch {
    req.user = null;
  }

  next();
};

// Admin Only
const adminOnly = (req, res, next) => {
  console.log('adminOnly middleware - user role:', req.user?.role);
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Admin Only",
    });
  }
};

module.exports = {
  protect,
  optionalAuth,
  adminOnly,
};
