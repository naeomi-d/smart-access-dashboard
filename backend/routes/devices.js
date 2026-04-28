const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all devices
router.get('/', (req, res) => {
  db.query('SELECT * FROM devices', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a device
router.post('/', (req, res) => {
  const { name, location } = req.body;
  db.query(
    'INSERT INTO devices (name, location) VALUES (?, ?)',
    [name, location],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Device added successfully' });
    }
  );
});

// Update device status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  db.query(
    'UPDATE devices SET status = ? WHERE id = ?',
    [status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Device status updated' });
    }
  );
});

module.exports = router;