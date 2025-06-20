import { useEffect, useState } from "react";
import "../styles/TeacherEventInfo.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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

  // Dummy event data
  const [events, setEvents] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:5000/api/events")
    .then((res) => {
      setEvents(res.data);
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
    });
}, []);


  const toggleVisibility = (id) => {
    setVisibleEventId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="event-info-page">
      <div className="profile-header-container">
        <header className="profile-header">
          <div className="logo" onClick={() => navigate("/")}>EventFlow</div>
          <nav className="profile-tabs">
            <span><Link to="/teacher-event-info">Events Info</Link></span>
            <span><Link to="/teacher-admin-panel">Your Panel</Link></span>
          </nav>
          <div className="icons">
            <FaBell className="icon" />
            <FaUserCircle className="icon" onClick={() => navigate('/teacher-profile')} />
          </div>
        </header>
      </div>

      <div className="events-section">
        <h2>All Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map(event => (
            <div className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <div className="icon-text"><FaCalendarAlt /> {event.date.slice(0, 10)}</div>
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
