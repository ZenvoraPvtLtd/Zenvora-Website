const path = require("path");
const net = require("net");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { verifyEmailConfig } = require("./utils/email");
const passport = require("./config/passport");

const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");
const careerRoutes = require("./routes/career.routes");
const adminRoutes = require("./routes/admin.routes");
const resumeRoutes = require("./routes/resume.routes");

const app = express();

// Verify Email Configuration
verifyEmailConfig();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1 && !allowedOrigins.includes(origin)) {
        return callback(new Error("CORS Policy: Origin not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/resume", resumeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Zenvora API running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Zenvora Graduate Services API",
    version: "1.0.0",
    status: "running",
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server
const PORT = process.env.PORT || 5000;

const ensurePortAvailable = (port) =>
  new Promise((resolve, reject) => {
    const tester = net.createServer();

    tester.once("error", (error) => {
      reject(error);
    });

    tester.once("listening", () => {
      tester.close(resolve);
    });

    tester.listen(port);
  });

const startServer = async () => {
  try {
    await ensurePortAvailable(PORT);
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`CORS Origin: ${process.env.CORS_ORIGIN}`);
      console.log(`Client URL: ${process.env.CLIENT_URL}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in backend/.env.`,
        );
        process.exit(1);
      }

      console.error(`Server failed to start: ${error.message}`);
      process.exit(1);
    });
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Stop the existing backend process or set a different PORT in backend/.env.`,
      );
      process.exit(1);
    }

    console.error(error.message);
    process.exit(1);
  }
};

startServer();
