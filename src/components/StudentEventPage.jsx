import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import "../styles/StudentEventPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StudentEventPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // ✅ Load registered events from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("registeredEvents");
    if (stored) {
      setRegisteredEvents(JSON.parse(stored));
    }
  }, [activeTab]); // Refresh when tab changes

  // ✅ Fetch all events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // ✅ Register an event (save to localStorage)
  const handleRegister = (event) => {
    const updated = [...registeredEvents, event];
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    setRegisteredEvents(updated);
    alert(`Registered for ${event.title}`);
  };

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
            <h2>Events</h2>
            <div className="sub-tabs">
              <span className={`sub-link ${activeTab === "all" ? "active-sub-link" : ""}`} onClick={() => setActiveTab("all")}>All Events</span>
              <span className={`sub-link ${activeTab === "registered" ? "active-sub-link" : ""}`} onClick={() => setActiveTab("registered")}>Registered</span>
            </div>
          </div>
        </div>

        <section className="events-container">
          {activeTab === "all" ? (
            events.map((event, index) => (
              <div key={index} className="event-card">
                <h3>{event.title}</h3>
                <span className="event-type" style={{
                  backgroundColor:
                    event.category === "Technical" ? "#d1e7ff" :
                      event.category === "Non-Technical" ? "#ffe9d6" : "#e1ffe7"
                }}>
                  {event.category}
                </span>
                <p>{event.description}</p>
                <p><FaCalendarAlt /> {event.date?.slice(0, 10)}</p>
                <p><FaClock /> {event.time}</p>
                <p><FaMapMarkerAlt /> {event.location}</p>
                <p><strong>Available Seats:</strong> {event.available_seats}</p>
                <button className="div1st-button" onClick={() => handleRegister(event)}>Register</button>
              </div>
            ))
          ) : (
            <div className="registered-events-list">
              <h3>Registered Events</h3>
              {registeredEvents.length === 0 ? (
                <p>No events registered yet.</p>
              ) : (
                <ul>
                  {registeredEvents.map((event, index) => (
                    <li key={index}>
                      <p><FaCalendarAlt style={{ marginRight: "8px", color: "#3b82f6" }} /><strong>Registered for {event.title}</strong></p>
                      <p><FaClock style={{ marginRight: "8px" }} />{event.time}</p>
                      <p><FaMapMarkerAlt style={{ marginRight: "8px" }} />{event.location}</p>
                      <p><FaCalendarAlt style={{ marginRight: "8px" }} />{event.date?.slice(0, 10)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentEventPage;
