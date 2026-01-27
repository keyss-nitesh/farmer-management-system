// backend/routes/expenses.js
const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all expenses for user
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM expenses WHERE user_id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

// Add expense
router.post('/', authenticateToken, (req, res) => {
  const { crop_name, date,description, amount } = req.body;
  db.query(
    'INSERT INTO expenses (user_id, crop_name, date,description, amount) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, crop_name, date,description, amount],
    (err) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.json({ message: 'Expense added' });
    }
  );
});

module.exports = router;
