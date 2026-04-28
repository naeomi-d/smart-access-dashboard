const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all logs
router.get('/', (req, res) => {
  db.query(
    'SELECT access_logs.*, users.name, users.email FROM access_logs JOIN users ON access_logs.user_id = users.id ORDER BY timestamp DESC',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Create a log (tap in/out)
router.post('/', (req, res) => {
  const { user_id, device_name, access_type } = req.body;
  db.query(
    'INSERT INTO access_logs (user_id, device_name, access_type) VALUES (?, ?, ?)',
    [user_id, device_name, access_type],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Log created successfully' });
    }
  );
});

module.exports = router;