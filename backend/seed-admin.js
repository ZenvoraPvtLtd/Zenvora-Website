const mongoose = require("mongoose");
const User = require("./src/models/User.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);

  const email = "samyakjain36153@gmail.com";
  const password = "Samyak@2003";

  let admin = await User.findOne({ email });
  if (admin) {
    admin.password = password;
    admin.role = "admin";
    admin.isActive = true;
    await admin.save();
    console.log("Admin password updated!");
  } else {
    admin = await User.create({
      name: "Samyak Jain",
      email: email,
      password: password,
      role: "admin",
      isActive: true,
      provider: "local"
    });
    console.log("Admin account created!");
  }

  process.exit(0);
}

seedAdmin();
