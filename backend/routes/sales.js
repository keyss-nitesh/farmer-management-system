// backend/routes/sales.js
const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all sales for user
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM sales WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

// Add sale
router.post('/', authenticateToken, (req, res) => {
  const { crop_name, date, sale_amount, purchaser_name } = req.body;
  db.query(
    'INSERT INTO sales (user_id, crop_name, date, sale_amount, purchaser_name) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, crop_name, date, sale_amount, purchaser_name],
    (err) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.json({ message: 'Sale added' });
    }
  );
});

module.exports = router;
