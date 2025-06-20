// controllers/eventController.js
const { pool } = require("../config/db");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      available_seats,
    } = req.body;

    const sql = `
      INSERT INTO events (title, description, date, time, location, category, available_seats)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      title,
      description,
      date,
      time,
      location,
      category,
      available_seats,
    ]);

    res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
     console.log("Backend received request to delete event ID:", eventId); // ✅ Add this line
    const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [eventId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      available_seats,
    } = req.body;

    const sql = `
      UPDATE events 
      SET title = ?, description = ?, date = ?, time = ?, location = ?, category = ?, available_seats = ?
      WHERE id = ?
    `;

    const [result] = await pool.execute(sql, [
      title,
      description,
      date,
      time,
      location,
      category,
      available_seats,
      eventId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



