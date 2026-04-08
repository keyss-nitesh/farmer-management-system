// // backend/db.js
// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect(err => {
//   if (err) console.log('MySQL connection error:', err);
//   else console.log('Connected to MySQL database');
// });

// module.exports = db;
// backend/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 13340, // Aiven ka port zaroori hai
  ssl: {
    rejectUnauthorized: false // <--- Ye line Aiven/Cloud DB ke liye sabse zaroori hai
  }
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database (Aiven/Local)');
  }
});

module.exports = db;