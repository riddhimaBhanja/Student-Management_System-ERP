const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const facultyRoutes = require("./routes/faculty.routes");
const academicRoutes = require("./routes/academic.routes");
const financeRoutes = require("./routes/finance.routes");
const libraryRoutes = require("./routes/library.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const hostelRoutes = require("./routes/hostel.routes");
const adminRoutes = require("./routes/admin.routes");
const departmentRoutes = require("./routes/department.routes");
const { authenticateToken } = require("./middleware/auth.middleware");
const globalErrorHandler = require("./utils/error-handler");
const { AppError } = require("./utils/error-handler");

// Load env vars and log where .env is loaded from (from backend folder)
const envPath = require("path").resolve(__dirname, ".env");
const result = dotenv.config({ path: envPath });
if (result.error) {
   console.warn("Could not load .env from:", envPath);
} else {
   console.log("Loaded .env from:", envPath);
}
console.log("MONGODB_URI for connection:", process.env.MONGODB_URI);
if (!process.env.MONGODB_URI) {
   throw new Error("MONGODB_URI is not defined! Check your backend/.env file and path.");
}

const app = express();

// CORS configuration for Codespace environment
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://bug-free-orbit-wrgqvq7wg9r7fgvx-5173.app.github.dev',
    'https://bug-free-orbit-wrgqvq7wg9r7fgvx-5174.app.github.dev'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
   res.status(200).json({
      status: "success",
      message: "Server is running",
      mongoConnection: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
   });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", authenticateToken, studentRoutes);
app.use("/api/faculty", authenticateToken, facultyRoutes);
app.use("/api/academic", authenticateToken, academicRoutes);
// Add alias route to support /api/api/academic if frontend is misconfigured
app.use("/api/api/academic", authenticateToken, academicRoutes);
app.use("/api/finance", authenticateToken, financeRoutes);
app.use("/api/library", authenticateToken, libraryRoutes);
app.use("/api/inventory", authenticateToken, inventoryRoutes);
app.use("/api/hostel", authenticateToken, hostelRoutes);
app.use("/api/admin", authenticateToken, adminRoutes);
app.use("/api/departments", authenticateToken, departmentRoutes);

// Handle undefined routes
app.all("*", (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export app
module.exports = app;

const PORT = process.env.PORT || 5000;

// Connect to database before starting server
const startServer = async () => {
   try {
      await connectDB();
      const server = app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });

      // Graceful shutdown
      process.on("SIGTERM", () => {
         console.info("SIGTERM signal received. Closing server...");
         server.close(() => {
            console.log("Server closed.");
            mongoose.connection.close(false, () => {
               console.log("MongoDB connection closed.");
               process.exit(0);
            });
         });
      });
   } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
   }
};

startServer();
