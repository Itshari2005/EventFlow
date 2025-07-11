import {
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate, NavLink } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import "../styles/TeacherAdminPanel.css";

const TeacherAdminPanel = () => {
  const navigate = useNavigate();
  const [isCreateEvent, setCreateEvent] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [events, setEvents] = useState([]);

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("eventflow_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const saveEventsToStorage = (updatedEvents) => {
    localStorage.setItem("eventflow_events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const handleEdit = (index) => {
    setEditIndex(index);
    setCreateEvent(true);
  };

  const handleDelete = (index) => {
    const eventToDelete = events[index];
    const confirmDelete = window.confirm(`Delete event "${eventToDelete.title}"?`);
    if (!confirmDelete) return;

    const updated = [...events];
    updated.splice(index, 1);
    saveEventsToStorage(updated);
  };

  const handleCreate = (eventData) => {
    const updatedEvents = [...events];

    if (editIndex !== null) {
      updatedEvents[editIndex] = { ...eventData, id: updatedEvents[editIndex].id || Date.now() };
    } else {
      updatedEvents.push({ ...eventData, id: Date.now() });
    }

    saveEventsToStorage(updatedEvents);
    setCreateEvent(false);
    setEditIndex(null);
  };

  return (
    <div>
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>EventFlow</div>
        <nav className="profile-tabs">
          <NavLink to="/teacher-event-info" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Event Info</NavLink>
          <NavLink to="/teacher-admin-panel" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Your Panel</NavLink>
        </nav>
        <div className="nav-buttons">
          <FaBell className="icon" />
          <FaUserCircle className="icon" onClick={() => navigate("/teacher-profile")} />
        </div>
      </header>

      <div className="your-panel">
        <div className="panel-details">
          <div className="div1st-panel">
            <div className="panel-text">
              <h3>Your Panel</h3>
              <p>Manage college events: Create events, update, delete</p>
            </div>
            <button
              className="div1st-button"
              onClick={() => {
                setCreateEvent(true);
                setEditIndex(null);
              }}
            >
              + Create Event
            </button>
          </div>
        </div>

        <div className="events-container">
          <h2>All Events</h2>
          <p>{events.length} events found</p>
          <table className="events-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <div className="event-title">{event.title}</div>
                    <span className={`tag ${event.category.toLowerCase().replace("-", "")}`}>
                      {capitalize(event.category)}
                    </span>
                  </td>
                  <td>
                    <div className="icon-text"><FaCalendarAlt /> {event.date?.slice(0, 10)}</div>
                    <div className="icon-text"><FaClock /> {event.time}</div>
                  </td>
                  <td>
                    <div className="icon-text"><FaMapMarkerAlt /> {event.location}</div>
                  </td>
                  <td>
                    {event.available_seats}
                    <div className="icon-text small"><FaUser /> 0 registered</div>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => handleEdit(index)}><FiEdit2 /></button>
                    <button className="action-btn" onClick={() => handleDelete(index)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isCreateEvent && (
          <CreateEvent
            onClose={() => {
              setCreateEvent(false);
              setEditIndex(null);
            }}
            onCreate={handleCreate}
            existingEvent={editIndex !== null ? events[editIndex] : null}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherAdminPanel;
