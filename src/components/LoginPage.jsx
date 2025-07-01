import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Header.css';

const LoginPage = () => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate dummy users (replace or expand if needed)
    const dummyStudents = [
      {
        roll_number: "21CS001",
        full_name: "Hari Prashath",
        email: "student@example.com",
        department: "CSE",
        year: "3",
        password: "student123"
      }
    ];

    const dummyTeachers = [
      {
        teacher_id: "T001",
        full_name: "Prof. Ravi",
        email: "teacher@example.com",
        password: "teacher123"
      }
    ];

    if (role === "student") {
      const user = dummyStudents.find(
        (stu) =>
          (stu.email === emailOrId || stu.roll_number === emailOrId) &&
          stu.password === password
      );

      if (user) {
        localStorage.setItem("student", JSON.stringify(user));
        localStorage.setItem("roll_number", user.roll_number);
        localStorage.setItem("fullName", user.full_name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("department", user.department);
        localStorage.setItem("year", user.year);
        navigate("/student-dashboard");
      } else {
        alert("Invalid student credentials.");
      }
    } else if (role === "teacher") {
      const user = dummyTeachers.find(
        (t) =>
          (t.email === emailOrId || t.teacher_id === emailOrId) &&
          t.password === password
      );

      if (user) {
        localStorage.setItem("teacher_id", user.teacher_id);
        localStorage.setItem("fullName", user.full_name);
        localStorage.setItem("email", user.email);
        navigate("/teacher-profile");
      } else {
        alert("Invalid teacher credentials.");
      }
    }
  };

  return (
    <div>
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}>EventFlow</div>
      </header>

      <div className="login-container">
        <h2 className="login-heading">Campus Events</h2>
        <p className="login-subtext">Sign in to explore, register, and manage your campus events</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email / Roll No / ID</label>
            <input
              type="text"
              placeholder="Enter your email or id or roll no"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-roles">
            <label>Role</label>
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
              <button type="button">Google</button>
              <button type="button">Facebook</button>
            </div>
            <Link to="/signup">Don’t have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
