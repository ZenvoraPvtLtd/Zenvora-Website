const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { sendWelcomeEmail, sendLoginNotification, sendPasswordResetEmail } = require("../utils/email");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto");

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
    const { name, email, phone, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check Existing User
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please log in or use a different email.",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone,
      password,
      role: role || "user",
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
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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
    const normalizedEmail = email.trim().toLowerCase();
    console.log('Login attempt for email:', email);
    console.log('Normalized email:', normalizedEmail);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find User
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // Check User
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check Password
    const bcrypt = require("bcryptjs");
    // If password stored in plain text (legacy), rehash it before comparison
    if (user.password && !user.password.startsWith("$2a$")) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
    }

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
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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

// ================= ADMIN LOGIN =================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find User
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // Check User
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only administrators can login here.",
      });
    }

    // Check Password
    const bcrypt = require("bcryptjs");
    if (user.password && !user.password.startsWith("$2a$")) {
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;
      await user.save();
    }

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
      message: "Admin login successful",
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Admin login failed",
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
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

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
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
};

// ================= GOOGLE OAUTH LOGIN =================

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google ID token is required",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user by googleId
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check existing user by email
      user = await User.findOne({ email: normalizedEmail });

      if (user) {
        // Link googleId and picture to existing local user
        user.googleId = googleId;
        if (!user.picture) user.picture = picture;
        if (!user.avatar) user.avatar = picture;
        await user.save();
      } else {
        // Create new Google user
        user = await User.create({
          name,
          email: normalizedEmail,
          googleId,
          picture,
          avatar: picture,
          provider: "google",
          providerId: googleId,
          role: "user",
        });
      }
    } else {
      // Sync Google profile picture if it changed
      if (picture && user.picture !== picture) {
        user.picture = picture;
        user.avatar = picture;
        await user.save();
      }
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Please contact support.",
      });
    }

    // Generate JWT
    const jwtToken = generateToken(user._id);

    // Send email login alert asynchronously
    sendLoginNotification(user).catch((err) => {
      console.error("Failed to send login notification email:", err);
    });

    res.json({
      success: true,
      message: "Google authentication successful",
      token: jwtToken,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google token verification failed:", error);
    res.status(401).json({
      success: false,
      message: "Google authentication failed: " + error.message,
    });
  }
};

// ================= FORGOT PASSWORD =================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find account if it exists. We still send a link to the entered email.
    const user = await User.findOne({ email: normalizedEmail });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    if (user) {
      // Set reset token and expiry (1 hour from now)
      user.resetToken = resetTokenHash;
      user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
      await user.save();
    }

    // Create reset link
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const resetLink = `${clientUrl}/admin/reset-password?token=${resetToken}`;

    const emailSent = await sendPasswordResetEmail(user || normalizedEmail, resetLink);

    if (!emailSent) {
      if (process.env.NODE_ENV !== "production") {
        console.log("Password reset link for development:", resetLink);

        return res.json({
          success: true,
          message: "Email is not configured, so use this development reset link.",
          resetLink,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Email is not configured correctly. Check backend .env SMTP/EMAIL settings.",
      });
    }

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process forgot password request",
    });
  }
};

// ================= RESET PASSWORD =================

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate input
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
    }

    // Hash the token
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: resetTokenHash,
      resetTokenExpiry: { $gt: new Date() },
    }).select("+resetToken +resetTokenExpiry");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Update password
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to reset password",
    });
  }
};

module.exports = {
  register,
  login,
  adminLogin,
  forgotPassword,
  resetPassword,
  getMe,
  oauthCallback,
  googleLogin,
};
