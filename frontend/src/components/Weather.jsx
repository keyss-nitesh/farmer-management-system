import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("Ludhiana");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("Ludhiana");

  useEffect(() => {
    getWeather("Ludhiana");
  }, []);

  const getWeather = async (searchCity = searchTerm) => {
    if (!searchCity.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${searchCity}`);
      setData(res.data);
    } catch (err) {
      setError("City not found. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.appWrapper}>
        
        {/* --- Top Search Bar --- */}
        <form onSubmit={(e) => { e.preventDefault(); getWeather(); }} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>{loading ? "..." : "🔍"}</button>
        </form>

        {error && <div style={styles.errorMsg}>{error}</div>}

        {data && (
          <div style={styles.content}>
            {/* --- Main Card Section --- */}
            <div style={styles.mainCard}>
              <h2 style={styles.cityName}>📍 {data.city}</h2>
              <h1 style={styles.mainTemp}>{Math.round(data.temperature)}°</h1>
              <p style={styles.condition}>{data.weather}</p>
              <p style={styles.subInfo}>
                Humidity {data.humidity}%  •  Wind {data.windSpeed} m/s
              </p>
            </div>

            {/* --- Grid Info Section (Apple Style) --- */}
            <div style={styles.gridContainer}>
              <div style={styles.infoBox}>
                <p style={styles.boxLabel}>💨 WIND</p>
                <p style={styles.boxValue}>{data.windSpeed} <span style={{fontSize: '14px'}}>m/s</span></p>
              </div>
              <div style={styles.infoBox}>
                <p style={styles.boxLabel}>💧 HUMIDITY</p>
                <p style={styles.boxValue}>{data.humidity}%</p>
              </div>
              <div style={styles.infoBox}>
                <p style={styles.boxLabel}>☁️ CONDITION</p>
                <p style={styles.boxValue} dangerouslySetInnerHTML={{ __html: data.weather.split(' ').join('<br/>') }}></p>
              </div>
              <div style={styles.infoBox}>
                <p style={styles.boxLabel}>🌡️ REAL FEEL</p>
                <p style={styles.boxValue}>{Math.round(data.temperature - 1)}°</p>
              </div>
            </div>

            {/* --- Smart Farming Suggestions (Modern Panel) --- */}
            <div style={styles.farmingPanel}>
              <h3 style={styles.panelTitle}>🌾 Smart Farming Advice</h3>
              <div style={styles.alertContainer}>
                {data.weather.toLowerCase().includes("rain") ? (
                  <div style={{...styles.alert, background: '#e1f5fe', color: '#01579b'}}>
                    🌧️ Rain expected! Avoid irrigation to save water.
                  </div>
                ) : data.temperature > 30 ? (
                  <div style={{...styles.alert, background: '#fff3e0', color: '#e65100'}}>
                    ☀️ High heat! Ensure proper moisture for crops.
                  </div>
                ) : (
                  <div style={{...styles.alert, background: '#e8f5e9', color: '#1b5e20'}}>
                    ✅ Weather is favorable for field activities.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Minimalist & Clean Styles ---
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  appWrapper: {
    width: "100%",
    maxWidth: "500px",
  },
  searchForm: {
    display: "flex",
    marginBottom: "30px",
    gap: "10px",
  },
  searchInput: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  searchBtn: {
    padding: "0 20px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#007AFF",
    color: "#fff",
    cursor: "pointer",
    fontSize: "18px",
  },
  mainCard: {
    backgroundColor: "#fff",
    padding: "40px 20px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    marginBottom: "20px",
    border: "1px solid #f0f0f0",
  },
  cityName: { fontSize: "22px", color: "#333", margin: "0 0 10px 0" },
  mainTemp: { fontSize: "80px", fontWeight: "300", margin: "0", color: "#222" },
  condition: { fontSize: "20px", color: "#666", textTransform: "capitalize", margin: "5px 0" },
  subInfo: { color: "#999", fontSize: "14px", marginTop: "10px" },
  
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  boxLabel: { fontSize: "12px", color: "#aaa", fontWeight: "600", marginBottom: "8px", letterSpacing: "1px" },
  boxValue: { fontSize: "24px", fontWeight: "600", color: "#333", margin: 0 },
  
  farmingPanel: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "24px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  },
  panelTitle: { fontSize: "16px", marginBottom: "15px", color: "#444" },
  alert: { padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: "500", lineHeight: "1.4" },
  errorMsg: { color: "#d32f2f", textAlign: "center", marginBottom: "10px" }
};