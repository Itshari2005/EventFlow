const bcrypt = require("bcrypt");
const { pool } = require("../config/db");

const login = async (req, res) => {
  const { identifier, password, role } = req.body;

  try {
    let user;
    if (role === "student") {
      const [rows] = await pool.query(
        "SELECT * FROM students WHERE email = ? OR rollNumber = ?",
        [identifier, identifier]
      );
      user = rows[0];
    } else if (role === "teacher") {
      const [rows] = await pool.query(
        "SELECT * FROM teachers WHERE email = ? OR teacher_id = ?",
        [identifier, identifier]
      );
      user = rows[0];
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", 
      user: {
    full_name: user.fullName,
    email: user.email,
    department: user.department || null,
    year: user.year || null,
    roll_number: user.rollNumber || null,
    teacher_id: user.teacher_id || null
  }});
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/signup
const signup = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Signup route called");
  const {
    fullName,
    email,
    password,
    role,
    rollNumber,
    department,
    year,
    teacher_id,
  } = req.body;

  try {
    // Check if email already exists in student or teacher table
    const [existingStudent] = await pool.query(
      "SELECT * FROM students WHERE email = ? OR rollNumber = ?",
      [email, rollNumber]
    );
    const [existingTeacher] = await pool.query(
      "SELECT * FROM teachers WHERE email = ? OR teacher_id = ?",
      [email, teacher_id]
    );

    if (
      (role === "student" && existingStudent.length > 0) ||
      (role === "teacher" && existingTeacher.length > 0)
    ) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into correct table
    if (role === "student") {
      await pool.query(
        `INSERT INTO students (fullName, email, password, rollNumber, department, year)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, hashedPassword, rollNumber, department, year]
      );
    } else if (role === "teacher") {
      await pool.query(
        `INSERT INTO teachers (fullName, email, password, teacher_id)
         VALUES (?, ?, ?, ?)`,
        [fullName, email, hashedPassword, teacher_id]
      );
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
