const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("./src/models/User.model");
require("dotenv").config();

async function generateResetLink() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);

  const email = "samyakjain36153@gmail.com";
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found!");
    process.exit(1);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetToken = resetTokenHash;
  user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  // Assuming this is for Admin Portal, we use the admin path
  const resetLink = `${clientUrl}/admin/reset-password/${encodeURIComponent(resetToken)}`;

  console.log("=========================================");
  console.log("YOUR NEW RESET PASSWORD LINK:");
  console.log(resetLink);
  console.log("=========================================");

  process.exit(0);
}

generateResetLink();
