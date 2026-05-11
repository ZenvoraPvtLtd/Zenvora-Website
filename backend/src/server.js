require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");
const careerRoutes = require("./routes/career.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Zenvora API running" });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
