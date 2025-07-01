import { useState, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaSignOutAlt,
  FaMoon
} from "react-icons/fa";
import "../styles/StudentProfilePage.css";
import { NavLink, useNavigate } from "react-router-dom";

const StudentProfilePage = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fullName = localStorage.getItem("fullName") || "Student";
    const email = localStorage.getItem("email") || "student@email.com";
    const departmentRaw = localStorage.getItem("department") || "Dept";
    const department = departmentRaw.slice(0, 10);
    const year = localStorage.getItem("year") || "1st Year";

    setUser({
      full_name: fullName,
      email,
      department,
      year,
    });
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>EventFlow</div>
        <nav className="profile-tabs">
          <NavLink to="/student-dashboard" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
            Dashboard
          </NavLink>
          <NavLink to="/student-events" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
            Events
          </NavLink>
        </nav>
        <div className="nav-buttons">
          <FaBell className="icon" />
          <FaUserCircle className="icon" onClick={() => navigate("/student-profile")} />
        </div>
      </header>

      <div className="profile-page">
        <div className="profile-info-container">
          <div className="user-basic-info">
            <img alt="Profile" className="user-image" />
            <h2>{user.full_name}</h2>
            <p className="user-role">Student</p>
          </div>
          <div className="user-contact">
            <p><FaEnvelope /> {user.email}</p>
            <p><FaBuilding /> Department: {user.department}</p>
            <p><FaCalendarAlt /> Year: {user.year}</p>
          </div>
          <hr />
        </div>

        <div className="activity-stats-container">
          <div className="activity-item">
            <p>Events Attended</p>
            <span>15</span>
          </div>
          <div className="activity-item">
            <p>Score Points</p>
            <span>240</span>
          </div>
          <div className="activity-item">
            <p>Member Since</p>
            <span>2023</span>
          </div>
        </div>

        <div className="settings-container">
          <h3>Settings</h3>
          <p className="settings-subtext">Manage your account settings and preferences</p>

          <div className="settings-subsection">
            <div className="setting-label">
              <FaMoon style={{ marginRight: "8px" }} />
              Dark Mode
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-subsection">
            <div className="setting-label">Email Notifications</div>
            <label className="toggle-switch">
              <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="settings-subsection">
            <div className="setting-label">Push Notifications</div>
            <label className="toggle-switch">
              <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="logout-container">
            <button className="logout-btn" onClick={() => {
              localStorage.clear(); // clear data if needed
              navigate("/");
            }}>
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
