const User = require("../models/User.model");
const Contact = require("../models/Contact.model");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

// Dashboard
const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalContacts,
      totalJobs,
      totalApplications,
      applicationStatusGroups,
    ] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      Application.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const applicationStatusCounts = {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };

    applicationStatusGroups.forEach(({ _id, count }) => {
      if (_id && Object.prototype.hasOwnProperty.call(applicationStatusCounts, _id)) {
        applicationStatusCounts[_id] = count;
      }
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalContacts,
        totalJobs,
        totalApplications,
        applicationStatusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const buildIntervals = (range) => {
  const now = new Date();
  const intervals = [];
  const labels = [];

  if (range === "year") {
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      intervals.push({ start, end });
      labels.push(date.toLocaleString("en-US", { month: "short" }));
    }
  } else if (range === "month") {
    for (let i = 3; i >= 0; i--) {
      const end = new Date(now);
      end.setDate(end.getDate() - i * 7);
      end.setHours(23, 59, 59, 999);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      intervals.push({ start, end });
      labels.push(`${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
      intervals.push({ start, end });
      labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }
  }

  return { labels, intervals };
};

// Get Activity Overview
const getActivity = async (req, res) => {
  try {
    const range = req.query.range || "week";
    const { labels, intervals } = buildIntervals(range);

    const countByInterval = async (Model) => {
      return Promise.all(
        intervals.map(({ start, end }) =>
          Model.countDocuments({ createdAt: { $gte: start, $lte: end } }),
        ),
      );
    };

    const [users, jobs, applications, contacts] = await Promise.all([
      countByInterval(User),
      countByInterval(Job),
      countByInterval(Application),
      countByInterval(Contact),
    ]);

    res.json({
      success: true,
      data: {
        labels,
        users,
        jobs,
        applications,
        contacts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get recent activities (mixed list)
const getRecentActivities = async (req, res) => {
  try {
    const limit = 10;

    const [recentUsers, recentJobs, recentApps, recentContacts] = await Promise.all([
      User.find().sort({ createdAt: -1 }).limit(limit).select("name createdAt"),
      Job.find().sort({ createdAt: -1 }).limit(limit).select("title createdAt"),
      Application.find().sort({ createdAt: -1 }).limit(limit).select("name jobTitle createdAt"),
      Contact.find().sort({ createdAt: -1 }).limit(limit).select("firstName lastName service createdAt"),
    ]);

    const activities = [];

    recentUsers.forEach((u) => activities.push({ type: "user", text: `${u.name} registered`, createdAt: u.createdAt }));
    recentJobs.forEach((j) => activities.push({ type: "job", text: `Job posted: ${j.title}`, createdAt: j.createdAt }));
    recentApps.forEach((a) => activities.push({ type: "application", text: `${a.name} applied for ${a.jobTitle || "a role"}`, createdAt: a.createdAt }));
    recentContacts.forEach((c) => activities.push({ type: "contact", text: `${c.firstName} ${c.lastName} contacted about ${c.service || "general"}`, createdAt: c.createdAt }));

    activities.sort((a, b) => b.createdAt - a.createdAt);

    res.json({ success: true, data: activities.slice(0, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
  getActivity,
  getRecentActivities,
};
