import { useEffect, useState } from "react";
import "../styles/TeacherEventInfo.css";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TeacherEventInfo = () => {
  const navigate = useNavigate();
  const [visibleEventId, setVisibleEventId] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 🟢 Get events created by this teacher from localStorage
    const teacherId = localStorage.getItem("teacher_id");
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const teacherEvents = allEvents.filter(event => event.teacher_id === teacherId);
    setEvents(teacherEvents);
  }, []);

  const toggleVisibility = (id) => {
    setVisibleEventId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>EventFlow</div>
        <nav className="profile-tabs">
          <NavLink
            to="/teacher-event-info"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Event Info
          </NavLink>
          <NavLink
            to="/teacher-admin-panel"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Your Panel
          </NavLink>
        </nav>
        <div className="nav-buttons">
          <FaBell className="icon" />
          <FaUserCircle className="icon" onClick={() => navigate("/teacher-profile")} />
        </div>
      </header>

      {/* Events Section */}
      <div className="event-info-page">
        <h2>All Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <div className="icon-text"><FaCalendarAlt /> {event.date}</div>
              <p><FaMapMarkerAlt /> {event.location}</p>
              {event.time && (
                <div className="icon-text">
                  <FaClock /> {event.time}
                </div>
              )}

              <button
                className="toggle-button"
                onClick={() => toggleVisibility(event.id)}
              >
                {visibleEventId === event.id
                  ? "Hide Registered Students"
                  : "View Registered Students"}
              </button>

              {visibleEventId === event.id && (
                <div className="student-table-container">
                  <p>Feature coming soon: Student registration info</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherEventInfo;
