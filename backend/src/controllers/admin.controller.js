const User = require("../models/User.model");
const Contact = require("../models/Contact.model");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

// Dashboard
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalContacts,
        totalJobs,
        totalApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const allowed = {};
    ["name", "phone", "role", "isActive"].forEach((field) => {
      if (req.body[field] !== undefined) allowed[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.params.id, allowed, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.name === "CastError" ? 400 : 500).json({
      success: false,
      message: error.name === "CastError" ? "Invalid user id" : error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(error.name === "CastError" ? 400 : 500).json({
      success: false,
      message: error.name === "CastError" ? "Invalid user id" : error.message,
    });
  }
};

// ================= ADMIN MANAGEMENT =================

// Get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password").sort({ createdAt: -1 });

    res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create admin user
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: normalizedEmail });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create admin user
    const admin = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || "",
      password,
      role: "admin",
      provider: "local",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create admin",
    });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  try {
    const allowed = {};
    ["name", "phone", "isActive"].forEach((field) => {
      if (req.body[field] !== undefined) allowed[field] = req.body[field];
    });

    // If password is provided, update it
    if (req.body.password) {
      allowed.password = req.body.password;
    }

    const admin = await User.findByIdAndUpdate(req.params.id, allowed, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Verify admin role
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "User is not an admin",
      });
    }

    res.json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(error.name === "CastError" ? 400 : 500).json({
      success: false,
      message: error.name === "CastError" ? "Invalid admin id" : error.message,
    });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own admin account",
      });
    }

    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Verify admin role
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "User is not an admin",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(error.name === "CastError" ? 400 : 500).json({
      success: false,
      message: error.name === "CastError" ? "Invalid admin id" : error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
  updateUser,
  deleteUser,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
