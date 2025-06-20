const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { pool, testConnection } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require('./routes/eventRoutes');
dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Test MySQL connection
testConnection();

// Routes
app.use("/api/auth", authRoutes); // Auth-related routes
app.use("/api/events", eventRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
