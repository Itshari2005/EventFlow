// config/db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a pool of connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database connected.");
    connection.release(); // Release connection back to pool
  } catch (error) {
    console.error("❌ Unable to connect to MySQL database:", error);
  }
};

module.exports = { pool, testConnection };
