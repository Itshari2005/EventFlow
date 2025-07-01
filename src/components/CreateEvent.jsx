import { useState, useEffect } from "react";
import "../styles/CreateEvent.css";

const CreateEvent = ({ onClose, onUpdate, editData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [seats, setSeats] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setDate(editData.date || "");
      setTime(editData.time || "");
      setLocation(editData.location || "");
      setCategory(
        ["technical", "non-technical"].includes(editData.category)
          ? editData.category
          : "others"
      );
      setOtherCategory(
        ["technical", "non-technical"].includes(editData.category)
          ? ""
          : editData.category
      );
      setSeats(editData.available_seats || "");
    }
  }, [editData]);

  const saveToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("events")) || [];
  };

  const handleCreate = (eventData) => {
    const allEvents = getFromLocalStorage();
    const newEvent = {
      ...eventData,
      id: Date.now(), // simple unique ID
    };
    const updatedEvents = [...allEvents, newEvent];
    saveToLocalStorage(updatedEvents);
    alert("Event created successfully!");
  };

  const handleUpdate = (eventData) => {
    let allEvents = getFromLocalStorage();
    allEvents = allEvents.map((event) =>
      event.id === eventData.id ? { ...eventData } : event
    );
    saveToLocalStorage(allEvents);
    alert("Event updated successfully!");
    onUpdate(eventData); // notify parent
  };

  const handleSubmit = () => {
    const eventData = {
      title,
      description,
      date,
      time,
      location,
      category: category === "others" ? otherCategory : category,
      available_seats: parseInt(seats, 10),
    };

    if (editData) {
      handleUpdate({ ...eventData, id: editData.id });
    } else {
      const teacher_id = localStorage.getItem("teacher_id");
      if (!teacher_id) {
        alert("Teacher ID not found in localStorage.");
        return;
      }
      handleCreate({ ...eventData, teacher_id });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{editData ? "Edit Event" : "Create New Event"}</h2>
        <p className="sub-text">
          {editData
            ? "Update the details of the event."
            : "Fill in the details to create a new college event."}
        </p>

        <label>Title</label>
        <input
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="row">
          <div className="half">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="half">
            <label>
              Time <span style={{ fontSize: "0.9em", color: "gray" }}>(e.g. 09:30 AM)</span>
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <label>Location</label>
        <input
          type="text"
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="row">
          <div className="half">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="technical">Technical</option>
              <option value="non-technical">Non-Technical</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="half">
            <label>Available Seats</label>
            <input
              type="number"
              placeholder="Enter seat count"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
        </div>

        {category === "others" && (
          <input
            type="text"
            placeholder="Specify other category"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
          />
        )}

        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="create-btn" onClick={handleSubmit}>
            {editData ? "Update Event" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
