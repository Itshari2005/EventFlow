import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Header.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    roll_no_or_id: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Prepare request body
  const body = {
    fullName: formData.full_name,
    email: formData.email,
    password: formData.password,
    role: role,
    rollNumber: role === "student" ? formData.roll_no_or_id : undefined,
    department: role === "student" ? department : undefined,
    year: role === "student" ? year : undefined,
    teacher_id: role === "teacher" ? formData.roll_no_or_id : undefined,
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      // optionally redirect to login
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error("❌ Signup error:", err);
    alert("Server error");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header className='header'>
        <div className='logo' onClick={()=> navigate('/')}>EventFlow</div>
      </header>
      <div className="signup-container">
        <h2 className="create-account">Create an Account</h2>
        <p className="create-account-p">Enter your information to get started</p>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full_name">Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-roles">
            <label htmlFor="role">Role</label>
            <div className="radio-options">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="student">Student</label>

              <input
                type="radio"
                id="teacher"
                name="role"
                value="teacher"
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>

          {role && (
            <div className="form-group">
              <label htmlFor="roll_no_or_id">
                {role === "student" ? "Roll Number" : "Teacher ID"}
              </label>
              <input
                type="text"
                id="roll_no_or_id"
                name="roll_no_or_id"
                placeholder={role === "student" ? "Enter your Roll Number" : "Enter your Teacher ID"}
                value={formData.roll_no_or_id}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {role === "student" && (
            <>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  placeholder="Enter your Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  placeholder="Enter your Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button className="create-button" type="submit">
            Create Account
          </button>
          <hr />
          <div className="social-sign-up">
            <h5>OR SIGN UP WITH</h5>
            <div className="social-buttons">
              <button type="button">Google</button>
              <button type="button">Facebook</button>
            </div>
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

