// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const expenseRoutes = require('./routes/expenses');
// const saleRoutes = require('./routes/sales');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/sales', saleRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// backend/server.js
// backend/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const saleRoutes = require('./routes/sales');
const weatherRoutes = require('./routes/weather');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api', weatherRoutes); // Ya direct app.use('/', weatherRoutes);

// ── Weather Alert Service ──
const { startWeatherAlerts, checkAndSendAlerts } = require('./services/weatherAlert');
startWeatherAlerts(); // Roz 6 AM pe chalega

// ── Test Route (testing ke liye) ──
app.get('/api/test-weather', async (req, res) => {
  try {
    await checkAndSendAlerts();
    res.json({ message: '✅ Weather check done! Check your email.' });
  } catch (err) {
    console.error('Test weather error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/view-data', async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT * FROM users');
    const [sales] = await db.promise().query('SELECT * FROM sales');
    res.json({ users, sales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
