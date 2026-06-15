const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = "mongodb://admin:G0kdxtozPxUgx7Oi@ac-odum70s-shard-00-00.vr0xlf7.mongodb.net:27017,ac-odum70s-shard-00-01.vr0xlf7.mongodb.net:27017,ac-odum70s-shard-00-02.vr0xlf7.mongodb.net:27017/zenvora_ai?ssl=true&replicaSet=atlas-1envof-shard-0&authSource=admin&appName=Cluster0";

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI or MONGODB_URI in backend/.env");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || "zenvora",
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected to database:", mongoose.connection.db.databaseName);
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;

