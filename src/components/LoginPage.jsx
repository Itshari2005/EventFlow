import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: emailOrId,
        password,
        role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Login successful:", data);
      const user = data.user;
      if (role === "student") {
        localStorage.setItem("student", JSON.stringify(user));
        localStorage.setItem("roll_number", user.roll_number);
        localStorage.setItem("fullName", user.full_name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("department", user.department);
        localStorage.setItem("year", user.year); // This fixes the error
        navigate("/student-dashboard");
      }
      else if (role === "teacher") {
        localStorage.setItem("teacher_id", user.teacher_id);
        localStorage.setItem("fullName", user.full_name); // ✅ store full name
        localStorage.setItem("email", user.email);
        navigate("/teacher-profile");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    alert("Something went wrong during login.");
  }
};


  return (
    <div className="login-container">
      <h2 className="login-heading">Campus Events</h2>
      <p className="login-subtext">Sign in to explore, register, and manage your campus events</p>
      <button type='button' className='dummy-button' onClick={() => navigate('/student-profile')}>Student Profile</button>
      <button type='button' className='dummy-button' onClick={() => navigate('/teacher-profile')}>Teacher Profile</button>
      <button type='button' className='dummy-button' onClick={() => navigate('/student-dashboard')}>Stu Dashboard</button>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="text">Email / Roll No / ID</label>
          <input
            type="text"
            id="login-id"
            name="login-id"
            placeholder="Enter your email or id or roll no"
            value={emailOrId}
            onChange={(e) => setEmailOrId(e.target.value)}
            required
          />
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <a href="#" className="forgot-password">Forgot Password?</a>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              checked={role === 'student'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="student">Student</label>
            <input
              type="radio"
              id="teacher"
              name="role"
              value="teacher"
              checked={role === 'teacher'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="teacher">Teacher</label>
          </div>
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="sign-in-button">Sign In</button>

        <hr />

        <div className="social-sign-in">
          <h5>OR SIGN IN WITH</h5>
          <div className="social-buttons">
            <button type='button'>Google</button>
            <button type='button'>Facebook</button>
          </div>
          <Link to="/signup">Don’t have an account? Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
