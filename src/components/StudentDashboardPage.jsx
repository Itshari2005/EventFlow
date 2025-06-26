import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/StudentDashboardPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboardPage = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((res) => setUpcomingEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
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
      <div className="your-panel">
        <div className="panel-details">
          <div className="div1st-panel">
            <div className="panel-text">
              <h2>Dashboard</h2>
              <p>Welcome back! Here's what's happening with your events.</p>
            </div>
          </div>
        </div>

        <section className="summary-cards">
          {/* Placeholder summary counts */}
          <div className="card"><h3>Total Events</h3><strong>{upcomingEvents.length}</strong></div>
          <div className="card"><h3>Registered</h3><strong>5</strong></div>
          <div className="card"><h3>Upcoming</h3><strong>{upcomingEvents.length}</strong></div>
          <div className="card"><h3>Completed</h3><strong>8</strong></div>
          <div className="card"><h3>Missed</h3><strong>1</strong></div>
          <div className="card"><h3>Score Points</h3><strong>120</strong></div>
        </section>

        <section className="events-container">
          <h3>Upcoming Events</h3>
          <div className="event-cards">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card">
                <h4>{event.title}</h4>
                <p><FaCalendarAlt /> {event.date?.slice(0, 10)}</p>
                <p><FaClock /> {event.time}</p>
                <p><FaMapMarkerAlt /> {event.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
