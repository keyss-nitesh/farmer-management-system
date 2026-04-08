// backend/routes/sales.js
const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all sales for user
router.get('/', authenticateToken, (req, res) => {
  db.query(
    'SELECT * FROM sales WHERE user_id = ? ORDER BY date DESC',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.json(results);
    }
  );
});

// Add sale
router.post('/', authenticateToken, (req, res) => {
  const { crop_name, date, sale_amount, purchaser_name, payment_mode } = req.body;

  if (!crop_name || !date || !sale_amount) {
    return res.status(400).json({ message: 'crop_name, date, and sale_amount are required' });
  }

  db.query(
    'INSERT INTO sales (user_id, crop_name, date, sale_amount, purchaser_name, payment_mode) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, crop_name, date, sale_amount, purchaser_name || null, payment_mode || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      // Return saved sale with id
      res.json({
        id: result.insertId,
        user_id: req.user.id,
        crop_name,
        date,
        sale_amount,
        purchaser_name: purchaser_name || null,
        payment_mode: payment_mode || null,
      });
    }
  );
});

module.exports = router;
