const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: false,
      select: false,
    },

    provider: {
      type: String,
      enum: ["local", "google", "microsoft"],
      default: "local",
    },

    providerId: {
      type: String,
      select: false,
    },

    avatar: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;

  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
