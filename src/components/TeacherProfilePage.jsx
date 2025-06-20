import { useState, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaEnvelope,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/TeacherProfilePage.css';

const TeacherProfilePage = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [user, setUser] = useState({}); // New: teacher user from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = {
      full_name: localStorage.getItem("fullName") || "Teacher",
      email: localStorage.getItem("email") || "email@example.com",
    };
    setUser(teacherData);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-header-container">
        <header className="profile-header">
          <div className="logo" onClick={() => navigate('/')}>EventFlow</div>
          <nav className="profile-tabs">
            <NavLink to="/teacher-event-info" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
              Event Info
            </NavLink>
            <NavLink to="/teacher-admin-panel" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>
              Your Panel
            </NavLink>
          </nav>
          <div className="icons">
            <FaBell className="icon" />
            <FaUserCircle className="icon" onClick={() => navigate("/teacher-profile")} />
          </div>
        </header>
      </div>

      <div className="profile-info-container">
        <div className="user-basic-info">
          <img alt="Profile" className="user-image" />
          <h2>{user.full_name}</h2>
          <p className="user-role">Teacher</p>
        </div>
        <div className="user-contact">
          <p><FaEnvelope /> {user.email}</p>
        </div>
        <hr />
      </div>

      <div className="settings-container">
        <h3>Settings</h3>
        <p className="settings-subtext">Manage your account settings and preferences</p>

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
          <button className="logout-btn" onClick={() => navigate('/')}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
