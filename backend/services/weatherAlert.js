// const nodemailer = require('nodemailer');
// const axios = require('axios');
// const cron = require('node-cron');
// const db = require('../db');
 
// /* ================= EMAIL TRANSPORTER ================= */
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
 
// /* ================= FETCH WEATHER ================= */
// const getWeather = async (city) => {
//   try {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
//     const response = await axios.get(url);
//     const data = response.data;
 
//     return {
//       city: data.name,
//       temp: data.main.temp,
//       feelsLike: data.main.feels_like,
//       humidity: data.main.humidity,
//       condition: data.weather[0].main,        // Rain, Clear, Clouds, Thunderstorm, Snow etc
//       description: data.weather[0].description,
//     };
//   } catch (err) {
//     console.error('Weather fetch error:', err.message);
//     return null;
//   }
// };
 
// /* ================= CHECK CONDITIONS ================= */
// const getAlertMessage = (weather) => {
//   const alerts = [];
 
//   if (weather.temp > 42) {
//     alerts.push({
//       emoji: '🌡️',
//       subject: 'Extreme Heat Alert — Protect Your Crops!',
//       message: `Temperature is extremely high at ${weather.temp}°C. Water your crops immediately and provide shade if possible.`,
//     });
//   } else if (weather.temp > 38) {
//     alerts.push({
//       emoji: '☀️',
//       subject: 'High Temperature Alert',
//       message: `Temperature is ${weather.temp}°C. Make sure crops get enough water today.`,
//     });
//   }
 
//   if (weather.condition === 'Rain' || weather.condition === 'Drizzle') {
//     alerts.push({
//       emoji: '🌧️',
//       subject: 'Rain Alert — Plan Accordingly',
//       message: `Rain is expected in ${weather.city}. Consider harvesting early if crops are ready.`,
//     });
//   }
 
//   if (weather.condition === 'Thunderstorm') {
//     alerts.push({
//       emoji: '⛈️',
//       subject: 'Storm Alert — Protect Your Farm!',
//       message: `Thunderstorm expected in ${weather.city}. Secure your equipment and protect your crops immediately.`,
//     });
//   }
 
//   if (weather.condition === 'Snow') {
//     alerts.push({
//       emoji: '❄️',
//       subject: 'Frost/Snow Alert',
//       message: `Snow or frost expected in ${weather.city}. Cover sensitive crops to prevent damage.`,
//     });
//   }
 
//   if (weather.humidity > 85) {
//     alerts.push({
//       emoji: '💧',
//       subject: 'High Humidity Alert',
//       message: `Humidity is at ${weather.humidity}%. High chances of fungal disease in crops. Consider applying fungicide.`,
//     });
//   }
 
//   return alerts;
// };
 
// /* ================= SEND EMAIL ================= */
// const sendAlertEmail = async (toEmail, userName, weather, alert) => {
//   const mailOptions = {
//     from: `"FarmManager Alerts 🌾" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: `${alert.emoji} ${alert.subject}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        
//         <!-- Header -->
//         <div style="background-color: #639922; padding: 24px; text-align: center;">
//           <h1 style="color: white; margin: 0; font-size: 24px;">🌾 FarmManager</h1>
//           <p style="color: #d4edda; margin: 6px 0 0; font-size: 14px;">Weather Alert System</p>
//         </div>
 
//         <!-- Body -->
//         <div style="padding: 24px; background: #fff;">
//           <p style="font-size: 16px; color: #333;">Hello <strong>${userName}</strong>,</p>
          
//           <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 16px 0;">
//             <p style="margin: 0; font-size: 15px; color: #92400e;">
//               ${alert.emoji} <strong>${alert.subject}</strong>
//             </p>
//             <p style="margin: 8px 0 0; font-size: 14px; color: #555;">
//               ${alert.message}
//             </p>
//           </div>
 
//           <!-- Weather Info Box -->
//           <div style="background: #f4f6f8; border-radius: 8px; padding: 16px; margin: 16px 0;">
//             <h3 style="margin: 0 0 12px; color: #333; font-size: 15px;">📍 Current Weather — ${weather.city}</h3>
//             <table style="width: 100%; font-size: 14px; color: #555;">
//               <tr>
//                 <td style="padding: 4px 0;">🌡️ Temperature</td>
//                 <td style="text-align: right;"><strong>${weather.temp}°C</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">🤔 Feels Like</td>
//                 <td style="text-align: right;"><strong>${weather.feelsLike}°C</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">💧 Humidity</td>
//                 <td style="text-align: right;"><strong>${weather.humidity}%</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">🌤️ Condition</td>
//                 <td style="text-align: right;"><strong>${weather.description}</strong></td>
//               </tr>
//             </table>
//           </div>
 
//           <p style="font-size: 13px; color: #888; margin-top: 20px;">
//             Stay safe and take care of your crops. 🌱
//           </p>
//         </div>
 
//         <!-- Footer -->
//         <div style="background: #f4f6f8; padding: 16px; text-align: center; border-top: 1px solid #e0e0e0;">
//           <p style="margin: 0; font-size: 12px; color: #aaa;">
//             This is an automated alert from FarmManager. Do not reply to this email.
//           </p>
//         </div>
 
//       </div>
//     `,
//   };
 
//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Alert email sent to ${toEmail}`);
// };
 
// /* ================= MAIN FUNCTION ================= */
// const checkAndSendAlerts = async () => {
//   console.log('🌤️ Checking weather for all users...');
 
//   // Get all users with city from database
//   db.query('SELECT id, name, email, city FROM users WHERE city IS NOT NULL', async (err, users) => {
//     if (err) {
//       console.error('DB error fetching users:', err);
//       return;
//     }
 
//     for (const user of users) {
//       const weather = await getWeather(user.city);
//       if (!weather) continue;
 
//       const alerts = getAlertMessage(weather);
 
//       for (const alert of alerts) {
//         await sendAlertEmail(user.email, user.name, weather, alert);
//       }
 
//       if (alerts.length === 0) {
//         console.log(`✅ No alerts for ${user.name} (${user.city}) — Weather is fine.`);
//       }
//     }
//   });
// };
 
// /* ================= CRON JOB ================= */
// // Runs every day at 6:00 AM
// const startWeatherAlerts = () => {
//   cron.schedule('0 6 * * *', () => {
//     console.log('⏰ Running daily weather check at 6:00 AM...');
//     checkAndSendAlerts();
//   });
 
//   console.log('✅ Weather alert cron job started — runs daily at 6:00 AM');
// };
 
// module.exports = { startWeatherAlerts, checkAndSendAlerts };

// const nodemailer = require('nodemailer');
// const axios = require('axios');
// const cron = require('node-cron');
// const db = require('../db');

// /* ================= EMAIL TRANSPORTER ================= */
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* ================= FETCH WEATHER ================= */
// const getWeather = async (city) => {
//   try {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
//     const response = await axios.get(url);
//     const data = response.data;

//     return {
//       city: data.name,
//       temp: data.main.temp,
//       feelsLike: data.main.feels_like,
//       humidity: data.main.humidity,
//       condition: data.weather[0].main,
//       description: data.weather[0].description,
//     };
//   } catch (err) {
//     console.error('Weather fetch error:', err.message);
//     return null;
//   }
// };

// /* ================= CHECK CONDITIONS ================= */
// const getAlertMessage = (weather) => {
//   const alerts = [];

//   // 🌡️ Temperature alerts
//   if (weather.temp > 40) {
//     alerts.push({
//       emoji: '🌡️',
//       subject: 'Extreme Heat Alert — Protect Your Crops!',
//       message: `Temperature is extremely high at ${weather.temp.toFixed(1)}°C. Water your crops immediately and provide shade if possible.`,
//     });
//   } else if (weather.temp > 35) {
//     alerts.push({
//       emoji: '☀️',
//       subject: 'High Temperature Alert',
//       message: `Temperature is ${weather.temp.toFixed(1)}°C. Make sure crops get enough water today.`,
//     });
//   } else if (weather.temp > 30) {
//     alerts.push({
//       emoji: '🌤️',
//       subject: 'Warm Weather Notice',
//       message: `Temperature is ${weather.temp.toFixed(1)}°C in ${weather.city}. Keep an eye on crop moisture levels.`,
//     });
//   }

//   // 🌧️ Rain alert
//   if (weather.condition === 'Rain' || weather.condition === 'Drizzle') {
//     alerts.push({
//       emoji: '🌧️',
//       subject: 'Rain Alert — Plan Accordingly',
//       message: `Rain is expected in ${weather.city}. Consider harvesting early if crops are ready.`,
//     });
//   }

//   // ⛈️ Storm alert
//   if (weather.condition === 'Thunderstorm') {
//     alerts.push({
//       emoji: '⛈️',
//       subject: 'Storm Alert — Protect Your Farm!',
//       message: `Thunderstorm expected in ${weather.city}. Secure your equipment and protect your crops immediately.`,
//     });
//   }

//   // ❄️ Snow alert
//   if (weather.condition === 'Snow') {
//     alerts.push({
//       emoji: '❄️',
//       subject: 'Frost/Snow Alert',
//       message: `Snow or frost expected in ${weather.city}. Cover sensitive crops to prevent damage.`,
//     });
//   }

//   // 💧 Humidity alert
//   if (weather.humidity > 85) {
//     alerts.push({
//       emoji: '💧',
//       subject: 'High Humidity Alert',
//       message: `Humidity is at ${weather.humidity}%. High chances of fungal disease in crops. Consider applying fungicide.`,
//     });
//   }

//   return alerts;
// };

// /* ================= SEND EMAIL ================= */
// const sendAlertEmail = async (toEmail, userName, weather, alert) => {
//   const mailOptions = {
//     from: `"FarmManager Alerts 🌾" <${process.env.EMAIL_USER}>`,
//     to: toEmail,
//     subject: `${alert.emoji} ${alert.subject}`,
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        
//         <!-- Header -->
//         <div style="background-color: #639922; padding: 24px; text-align: center;">
//           <h1 style="color: white; margin: 0; font-size: 24px;">🌾 FarmManager</h1>
//           <p style="color: #d4edda; margin: 6px 0 0; font-size: 14px;">Weather Alert System</p>
//         </div>

//         <!-- Body -->
//         <div style="padding: 24px; background: #fff;">
//           <p style="font-size: 16px; color: #333;">Hello <strong>${userName}</strong>,</p>
          
//           <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 16px 0;">
//             <p style="margin: 0; font-size: 15px; color: #92400e;">
//               ${alert.emoji} <strong>${alert.subject}</strong>
//             </p>
//             <p style="margin: 8px 0 0; font-size: 14px; color: #555;">
//               ${alert.message}
//             </p>
//           </div>

//           <!-- Weather Info Box -->
//           <div style="background: #f4f6f8; border-radius: 8px; padding: 16px; margin: 16px 0;">
//             <h3 style="margin: 0 0 12px; color: #333; font-size: 15px;">📍 Current Weather — ${weather.city}</h3>
//             <table style="width: 100%; font-size: 14px; color: #555;">
//               <tr>
//                 <td style="padding: 4px 0;">🌡️ Temperature</td>
//                 <td style="text-align: right;"><strong>${weather.temp.toFixed(1)}°C</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">🤔 Feels Like</td>
//                 <td style="text-align: right;"><strong>${weather.feelsLike.toFixed(1)}°C</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">💧 Humidity</td>
//                 <td style="text-align: right;"><strong>${weather.humidity}%</strong></td>
//               </tr>
//               <tr>
//                 <td style="padding: 4px 0;">🌤️ Condition</td>
//                 <td style="text-align: right;"><strong>${weather.description}</strong></td>
//               </tr>
//             </table>
//           </div>

//           <p style="font-size: 13px; color: #888; margin-top: 20px;">
//             Stay safe and take care of your crops. 🌱
//           </p>
//         </div>

//         <!-- Footer -->
//         <div style="background: #f4f6f8; padding: 16px; text-align: center; border-top: 1px solid #e0e0e0;">
//           <p style="margin: 0; font-size: 12px; color: #aaa;">
//             This is an automated alert from FarmManager. Do not reply to this email.
//           </p>
//         </div>

//       </div>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
//   console.log(`✅ Alert email sent to ${toEmail}`);
// };

// /* ================= MAIN FUNCTION ================= */
// const checkAndSendAlerts = async () => {
//   console.log('🌤️ Checking weather for all users...');

//   db.query('SELECT id, name, email, city FROM users WHERE city IS NOT NULL', async (err, users) => {
//     if (err) {
//       console.error('DB error fetching users:', err);
//       return;
//     }

//     for (const user of users) {
//       const weather = await getWeather(user.city);
//       if (!weather) continue;

//       console.log(`📍 ${user.name} (${user.city}) — Temp: ${weather.temp}°C, Condition: ${weather.condition}`);

//       const alerts = getAlertMessage(weather);

//       for (const alert of alerts) {
//         await sendAlertEmail(user.email, user.name, weather, alert);
//       }

//       if (alerts.length === 0) {
//         console.log(`✅ No alerts for ${user.name} (${user.city}) — Weather is fine.`);
//       }
//     }
//   });
// };

// /* ================= CRON JOB ================= */
// const startWeatherAlerts = () => {
//   cron.schedule('0 17 * * *', () => {
//     console.log('⏰ Running daily weather check at 17:00 AM...');
//     checkAndSendAlerts();
//   });

//   console.log('✅ Weather alert cron job started — runs daily at 17:00 AM');
// };

// module.exports = { startWeatherAlerts, checkAndSendAlerts };




const nodemailer = require('nodemailer');
const axios = require('axios');
const cron = require('node-cron');
const db = require('../db');

/* ================= EMAIL TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= COOLDOWN SYSTEM ================= */
// In-memory cooldown store
// Production mein Redis use karo for persistence across restarts
const alertCooldowns = new Map();

const hasRecentAlert = (userId, alertEmoji, cooldownHours = 6) => {
  const key = `${userId}_${alertEmoji}`;
  const lastSent = alertCooldowns.get(key);
  if (!lastSent) return false;
  const hoursPassed = (Date.now() - lastSent) / (1000 * 60 * 60);
  return hoursPassed < cooldownHours;
};

const markAlertSent = (userId, alertEmoji) => {
  const key = `${userId}_${alertEmoji}`;
  alertCooldowns.set(key, Date.now());
};

/* ================= FETCH WEATHER ================= */
const getWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    return {
      city: data.name,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,   // m/s
      windDeg: data.wind.deg,       // wind direction in degrees
    };
  } catch (err) {
    console.error(`Weather fetch error for ${city}:`, err.message);
    return null;
  }
};

/* ================= CHECK CONDITIONS ================= */
const getAlertMessage = (weather) => {
  const alerts = [];

  // ─── 🌡️ HIGH Temperature ───────────────────────────────────────
  if (weather.temp > 40) {
    alerts.push({
      emoji: '🌡️',
      subject: 'Extreme Heat Alert — Protect Your Crops!',
      message: `Temperature is extremely high at ${weather.temp.toFixed(1)}°C in ${weather.city}. Water your crops immediately and provide shade if possible.`,
      isEmergency: true,
    });
  } else if (weather.temp > 35) {
    alerts.push({
      emoji: '☀️',
      subject: 'High Temperature Alert',
      message: `Temperature is ${weather.temp.toFixed(1)}°C in ${weather.city}. Make sure crops get enough water today.`,
      isEmergency: true,
    });
  } else if (weather.temp > 30) {
    alerts.push({
      emoji: '🌤️',
      subject: 'Warm Weather Notice',
      message: `Temperature is ${weather.temp.toFixed(1)}°C in ${weather.city}. Keep an eye on crop moisture levels.`,
      isEmergency: false,
    });
  }

  // ─── 🥶 LOW Temperature / Cold Wave ────────────────────────────
  if (weather.temp < 2) {
    alerts.push({
      emoji: '🥶',
      subject: 'Extreme Cold Alert — Frost Risk!',
      message: `Temperature has dropped to ${weather.temp.toFixed(1)}°C in ${weather.city}. Immediate risk of frost — cover sensitive crops and protect irrigation pipes.`,
      isEmergency: true,
    });
  } else if (weather.temp < 8) {
    alerts.push({
      emoji: '❄️',
      subject: 'Cold Wave Alert',
      message: `Temperature is ${weather.temp.toFixed(1)}°C in ${weather.city}. Cold wave conditions — protect frost-sensitive crops overnight.`,
      isEmergency: true,
    });
  } else if (weather.temp < 15) {
    alerts.push({
      emoji: '🌨️',
      subject: 'Cool Weather Notice',
      message: `Temperature is ${weather.temp.toFixed(1)}°C in ${weather.city}. Monitor cold-sensitive crops, especially at night.`,
      isEmergency: false,
    });
  }

  // ─── 🌧️ Rain / Drizzle ─────────────────────────────────────────
  if (weather.condition === 'Rain' || weather.condition === 'Drizzle') {
    alerts.push({
      emoji: '🌧️',
      subject: 'Rain Alert — Plan Accordingly',
      message: `Rain is expected in ${weather.city}. Consider harvesting early if crops are ready and avoid field operations.`,
      isEmergency: true,
    });
  }

  // ─── ⛈️ Thunderstorm ────────────────────────────────────────────
  if (weather.condition === 'Thunderstorm') {
    alerts.push({
      emoji: '⛈️',
      subject: 'Storm Alert — Protect Your Farm!',
      message: `Thunderstorm expected in ${weather.city}. Secure your equipment and protect your crops immediately.`,
      isEmergency: true,
    });
  }

  // ─── ❄️ Snow / Frost ────────────────────────────────────────────
  if (weather.condition === 'Snow') {
    alerts.push({
      emoji: '❄️',
      subject: 'Frost/Snow Alert',
      message: `Snow or frost expected in ${weather.city}. Cover sensitive crops to prevent damage.`,
      isEmergency: true,
    });
  }

  // ─── 💧 High Humidity ───────────────────────────────────────────
  if (weather.humidity > 85) {
    alerts.push({
      emoji: '💧',
      subject: 'High Humidity Alert',
      message: `Humidity is at ${weather.humidity}% in ${weather.city}. High chances of fungal disease in crops. Consider applying fungicide.`,
      isEmergency: false,
    });
  }

  // ─── 🌬️ Wind Speed ──────────────────────────────────────────────
  // OpenWeather sends wind.speed in m/s → convert to km/h (* 3.6)
  const windKmh = (weather.windSpeed * 3.6).toFixed(1);

  if (weather.windSpeed > 17) {
    alerts.push({
      emoji: '🌪️',
      subject: 'Dangerous Wind Alert — Secure Your Farm!',
      message: `Very strong winds of ${windKmh} km/h detected in ${weather.city}. Secure all equipment, greenhouses, and support structures immediately. Avoid any spraying operations.`,
      isEmergency: true,
    });
  } else if (weather.windSpeed > 10) {
    alerts.push({
      emoji: '🌬️',
      subject: 'High Wind Alert',
      message: `Strong winds of ${windKmh} km/h expected in ${weather.city}. Avoid pesticide/fertilizer spraying — drift risk is high. Secure loose farm equipment.`,
      isEmergency: true,
    });
  } else if (weather.windSpeed > 6) {
    alerts.push({
      emoji: '💨',
      subject: 'Moderate Wind Notice',
      message: `Moderate winds of ${windKmh} km/h in ${weather.city}. Be cautious while spraying — use low-drift nozzles if needed.`,
      isEmergency: false,
    });
  }

  return alerts;
};

/* ================= BUILD EMAIL HTML ================= */
const buildEmailHtml = (userName, weather, alert) => {
  const windKmh = weather.windSpeed ? (weather.windSpeed * 3.6).toFixed(1) : 'N/A';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">

      <!-- Header -->
      <div style="background-color: #639922; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🌾 FarmManager</h1>
        <p style="color: #d4edda; margin: 6px 0 0; font-size: 14px;">Weather Alert System</p>
      </div>

      <!-- Body -->
      <div style="padding: 24px; background: #fff;">
        <p style="font-size: 16px; color: #333;">Hello <strong>${userName}</strong>,</p>

        <!-- Alert Box -->
        <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; font-size: 15px; color: #92400e;">
            ${alert.emoji} <strong>${alert.subject}</strong>
          </p>
          <p style="margin: 8px 0 0; font-size: 14px; color: #555;">
            ${alert.message}
          </p>
        </div>

        <!-- Weather Info Box -->
        <div style="background: #f4f6f8; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h3 style="margin: 0 0 12px; color: #333; font-size: 15px;">📍 Current Weather — ${weather.city}</h3>
          <table style="width: 100%; font-size: 14px; color: #555; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0;">🌡️ Temperature</td>
              <td style="text-align: right;"><strong>${weather.temp.toFixed(1)}°C</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0;">🤔 Feels Like</td>
              <td style="text-align: right;"><strong>${weather.feelsLike.toFixed(1)}°C</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0;">💧 Humidity</td>
              <td style="text-align: right;"><strong>${weather.humidity}%</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0;">🌤️ Condition</td>
              <td style="text-align: right;"><strong>${weather.description}</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0;">🌬️ Wind Speed</td>
              <td style="text-align: right;"><strong>${windKmh} km/h</strong></td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #888; margin-top: 20px;">
          Stay safe and take care of your crops. 🌱
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f4f6f8; padding: 16px; text-align: center; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0; font-size: 12px; color: #aaa;">
          This is an automated alert from FarmManager. Do not reply to this email.
        </p>
      </div>

    </div>
  `;
};

/* ================= SEND EMAIL ================= */
const sendAlertEmail = async (toEmail, userName, weather, alert) => {
  try {
    const mailOptions = {
      from: `"FarmManager Alerts 🌾" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `${alert.emoji} ${alert.subject}`,
      html: buildEmailHtml(userName, weather, alert),
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Alert email sent to ${toEmail} — ${alert.subject}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${toEmail}:`, err.message);
  }
};

/* ================= MAIN FUNCTION ================= */
/**
 * emergencyOnly = true  → sirf isEmergency:true alerts bhejo (har 3 ghante wala check)
 * emergencyOnly = false → saare alerts bhejo (subah 6 baje wali summary)
 */
const checkAndSendAlerts = async ({ emergencyOnly = false } = {}) => {
  console.log(`\n🌤️ Weather check started — ${emergencyOnly ? 'Emergency Only' : 'Full Summary'}`);

  db.query('SELECT id, name, email, city FROM users WHERE city IS NOT NULL', async (err, users) => {
    if (err) {
      console.error('DB error fetching users:', err);
      return;
    }

    if (!users || users.length === 0) {
      console.log('⚠️ No users found with city set.');
      return;
    }

    for (const user of users) {
      const weather = await getWeather(user.city);
      if (!weather) {
        console.warn(`⚠️ Could not fetch weather for ${user.name} (${user.city})`);
        continue;
      }

      console.log(
        `📍 ${user.name} (${user.city}) — Temp: ${weather.temp.toFixed(1)}°C | ` +
        `Condition: ${weather.condition} | Wind: ${(weather.windSpeed * 3.6).toFixed(1)} km/h | ` +
        `Humidity: ${weather.humidity}%`
      );

      const alerts = getAlertMessage(weather);

      // Filter based on mode
      const alertsToSend = emergencyOnly
        ? alerts.filter((a) => a.isEmergency)
        : alerts;

      let emailsSent = 0;

      for (const alert of alertsToSend) {
        // ✅ Cooldown check — same alert 6 ghante mein dobara nahi jayegi
        if (hasRecentAlert(user.id, alert.emoji)) {
          console.log(`⏭️ Skipping "${alert.subject}" for ${user.name} — cooldown active`);
          continue;
        }

        await sendAlertEmail(user.email, user.name, weather, alert);
        markAlertSent(user.id, alert.emoji);
        emailsSent++;
      }

      if (emailsSent === 0) {
        console.log(`✅ No new alerts for ${user.name} (${user.city}) — all fine or on cooldown.`);
      }
    }

    console.log('✅ Weather check complete.\n');
  });
};

/* ================= CRON JOBS ================= */
const startWeatherAlerts = () => {

  // ✅ 1. Har 3 ghante emergency check — sirf dangerous conditions pe mail
  //    Cron: 0 */3 * * *  → 12am, 3am, 6am, 9am, 12pm, 3pm, 6pm, 9pm
  cron.schedule('0 */3 * * *', () => {
    console.log('⏰ [3hr Check] Running emergency weather check...');
    checkAndSendAlerts({ emergencyOnly: true });
  });

  // ✅ 2. Subah 6 baje full daily summary — saare alerts bhejo
  //    (Ye 3hr wale se alag hai — emergencyOnly: false)
  cron.schedule('0 16 * * *', () => {
    console.log('⏰ [6 AM] Running daily morning weather summary...');
    checkAndSendAlerts({ emergencyOnly: false });
  });

  console.log('✅ Weather alert cron jobs started:');
  console.log('   → Emergency check: every 3 hours');
  console.log('   → Daily summary:   every day at 16:00PM');
};

module.exports = { startWeatherAlerts, checkAndSendAlerts };
