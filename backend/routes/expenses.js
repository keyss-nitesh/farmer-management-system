// backend/routes/expenses.js
const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all expenses for user
router.get('/', authenticateToken, (req, res) => {
  db.query(
    'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.json(results);
    }
  );
});

// Add expense
router.post('/', authenticateToken, (req, res) => {
  const { crop_name, date, description, category, amount } = req.body;

  if (!crop_name || !date || !amount) {
    return res.status(400).json({ message: 'crop_name, date, and amount are required' });
  }

  db.query(
    'INSERT INTO expenses (user_id, crop_name, date, description, category, amount) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, crop_name, date, description || null, category || null, amount],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      
      // Return saved expense with id
      res.json({
        id: result.insertId,
        user_id: req.user.id,
        crop_name,
        date,
        description: description || null,
        category: category || null,
        amount,
      });
    }
  );
});

module.exports = router;
