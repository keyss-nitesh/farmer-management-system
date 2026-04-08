// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setExpenses, setSales } from '../redux/slice';
// import { useNavigate } from 'react-router-dom';
// function Dashboard() {
//   const dispatch = useDispatch();
//   const {
//     token,
//     expenses = [],
//     sales = [],
//     totalExpense,
//     totalSale,
//     profitLoss,
//     user,
//   } = useSelector((state) => state.farm);
// const navigate=useNavigate();
// function expense() {
//     navigate("/add-expense"); // lowercase!
// }
// function sale() {
//     navigate("/add-sale"); // lowercase!
// }

//   useEffect(() => {
//     const fetchData = async () => {
//       const expenseRes = await fetch('http://localhost:5000/api/expenses', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       dispatch(setExpenses(await expenseRes.json()));

//       const saleRes = await fetch('http://localhost:5000/api/sales', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       dispatch(setSales(await saleRes.json()));
//     };
//     if (token) fetchData();
//   }, [dispatch, token]);

//   /* ================= DERIVED INFO ================= */

//   const farmStatus =
//     profitLoss > 0
//       ? 'Healthy'
//       : profitLoss === 0
//       ? 'Stable'
//       : 'Needs Attention';

//   const insightMessage =
//     profitLoss > 0
//       ? 'Your farm is generating profit. Keep monitoring expenses.'
//       : 'Expenses are high. Try reducing unnecessary costs.';

//   /* ================= STYLES ================= */

//   const container = {
//     padding: '30px',
//     backgroundColor: '#f4f6f8',
//     minHeight: '100vh',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const grid = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
//     gap: '24px',
//     marginBottom: '40px',
//   };

//   const box = {
//     background: '#fff',
//     padding: '22px',
//     borderRadius: '16px',
//     boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
//   };

//   const title = {
//     fontSize: '18px',
//     marginBottom: '10px',
//     color: '#2d3748',
//     fontWeight: 'bold',
//   };

//   const button = {
//     padding: '10px 16px',
//     borderRadius: '8px',
//     border: 'none',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     marginRight: '10px',
//   };

//   /* ================= JSX ================= */

//   return (
//     <div style={container}>
//       {/* 👋 HEADER */}
//       <div style={{ marginBottom: '30px' }}>
//         <h1>🌾 Farm Dashboard</h1>
//         <p style={{ color: '#4a5568' }}>
//           Hello {user?.name || 'Farmer'}, here is today’s overview
//         </p>
//       </div>

//       {/* 📊 SUMMARY */}
//       <div style={grid}>
//         <div style={{ ...box, background: '#fff5f5' }}>
//           💸 <b>Total Expense</b>
//           <h2>₹ {totalExpense}</h2>
//         </div>

//         <div style={{ ...box, background: '#ebf8ff' }}>
//           🛒 <b>Total Sale</b>
//           <h2>₹ {totalSale}</h2>
//         </div>

//         <div
//           style={{
//             ...box,
//             background:
//               profitLoss >= 0 ? '#f0fff4' : '#fff5f5',
//           }}
//         >
//           📈 <b>Profit / Loss</b>
//           <h2>₹ {profitLoss}</h2>
//         </div>
//       </div>

//       {/* 🧠 FARM HEALTH */}
//       <div style={grid}>
//         <div style={box}>
//           <div style={title}>🌱 Farm Health</div>
//           <h2>{farmStatus}</h2>
//           <p>{insightMessage}</p>
//         </div>

//         <div style={box}>
//           <div style={title}>⚡ Quick Actions</div>
//           <button style={{ ...button, background: '#3182ce', color: '#fff' }} onClick={expense}>
//             ➕ Add Expense
//           </button>
//           <button style={{ ...button, background: '#38a169', color: '#fff' }} onClick={sale}>
//             ➕ Add Sale
//           </button>
//         </div>
//       </div>

//       {/* 🧾 RECENT DATA */}
//       <div style={grid}>
//         <div style={box}>
//           <div style={title}>🧾 Recent Expenses</div>
//           {expenses.slice(0, 4).map((e, i) => (
//             <p key={i}>
//               {e.crop_name} — ₹{e.amount}
//             </p>
//           ))}
//           {expenses.length === 0 && <p>No expenses added yet</p>}
//         </div>

//         <div style={box}>
//           <div style={title}>🛍 Recent Sales</div>
//           {sales.slice(0, 4).map((s, i) => (
//             <p key={i}>
//               {s.crop_name} — ₹{s.amount}
//             </p>
//           ))}
//           {sales.length === 0 && <p>No sales added yet</p>}
//         </div>
//       </div>

//       {/* 💡 TIPS */}
//       <div style={box}>
//         <div style={title}>💡 Smart Farming Tip</div>
//         <p>
//           Crop rotation helps maintain soil fertility and reduces pest buildup.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses, setSales, setAuth } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    token,
    totalExpense,
    totalSale,
    profitLoss,
    user,
    expenses = [],
    sales = [],
  } = useSelector((state) => state.farm);

  /* ================= TOKEN CHECK & REDIRECT ================= */
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      navigate("/login", { replace: true });
      return;
    }
    if (!token) {
      dispatch(setAuth({ token: localToken }));
    }
  }, [token, dispatch, navigate]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!token) return;

    const MIN_DELAY = 1500;
    const startTime = Date.now();

    const fetchData = async () => {
     try {
  // Pehle API URL setup karein
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Expenses Fetch
  const expenseRes = await fetch(`${API_BASE_URL}/api/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const expenseData = await expenseRes.json();
  dispatch(setExpenses(expenseData));

  // Sales Fetch
  const saleRes = await fetch(`${API_BASE_URL}/api/sales`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const saleData = await saleRes.json();
  dispatch(setSales(saleData));
  
}  catch (err) {
        console.error("API error:", err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(MIN_DELAY - elapsed, 0);
        setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchData();
  }, [token, dispatch]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <BiLoaderAlt size={48} style={{ animation: "spin 1s linear infinite", color: "#639922" }} />
        <p style={{ marginTop: "12px", fontSize: "15px", color: "#639922", fontWeight: "500" }}>
          Loading dashboard...
        </p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ================= DERIVED INFO ================= */
  const farmStatus = profitLoss > 0 ? "Healthy" : profitLoss === 0 ? "Stable" : "Needs Attention";
  const farmStatusColor = profitLoss > 0 ? "#3B6D11" : profitLoss === 0 ? "#b45309" : "#b91c1c";
  const farmStatusBg = profitLoss > 0 ? "#EAF3DE" : profitLoss === 0 ? "#fef3c7" : "#fee2e2";

  const insightMessage =
    profitLoss > 0
      ? "Your farm is generating profit. Keep monitoring expenses."
      : profitLoss === 0
      ? "Income and expenses are balanced."
      : "Expenses are high. Try reducing unnecessary costs.";

  /* ================= JSX ================= */
  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>🌾 Farm Dashboard</h1>
          <p style={styles.headerSub}>Hello {user?.name || "Farmer"}, here is today's overview</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.btnExpense} onClick={() => navigate("/add-expense")}>
            + Add Expense
          </button>
          <button style={styles.btnSale} onClick={() => navigate("/add-sale")}>
            + Add Sale
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={styles.statsGrid}>

        <div style={{ ...styles.statCard, borderTop: "3px solid #e53e3e" }}>
          <p style={styles.statLabel}>Total Expense</p>
          <h2 style={{ ...styles.statValue, color: "#e53e3e" }}>₹ {totalExpense}</h2>
          <p style={styles.statIcon}>💸</p>
        </div>

        <div style={{ ...styles.statCard, borderTop: "3px solid #3182ce" }}>
          <p style={styles.statLabel}>Total Sale</p>
          <h2 style={{ ...styles.statValue, color: "#3182ce" }}>₹ {totalSale}</h2>
          <p style={styles.statIcon}>🛒</p>
        </div>

        <div style={{ ...styles.statCard, borderTop: `3px solid ${profitLoss >= 0 ? "#639922" : "#e53e3e"}` }}>
          <p style={styles.statLabel}>Profit / Loss</p>
          <h2 style={{ ...styles.statValue, color: profitLoss >= 0 ? "#639922" : "#e53e3e" }}>
            {profitLoss >= 0 ? "+" : ""}₹ {profitLoss}
          </h2>
          <p style={styles.statIcon}>📈</p>
        </div>

      </div>

      {/* ── Farm Health + Tip ── */}
      <div style={styles.midGrid}>

        <div style={styles.card}>
          <p style={styles.cardLabel}>🌱 Farm Health</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
            <span style={{ ...styles.badge, backgroundColor: farmStatusBg, color: farmStatusColor }}>
              {farmStatus}
            </span>
          </div>
          <p style={styles.insightText}>{insightMessage}</p>

          {/* Mini progress bar */}
          <div style={styles.progressBg}>
            <div style={{
              ...styles.progressFill,
              width: `${Math.min(100, Math.max(0, (totalSale / (totalExpense || 1)) * 50))}%`,
              backgroundColor: profitLoss >= 0 ? "#639922" : "#e53e3e",
            }} />
          </div>
          <div style={styles.progressLabels}>
            <span>Expense</span>
            <span>Sale</span>
          </div>
        </div>

        <div style={styles.card}>
          <p style={styles.cardLabel}>💡 Smart Farming Tip</p>
          <div style={styles.tipBox}>
            <p style={styles.tipText}>
              Crop rotation helps maintain soil fertility and reduces pest buildup over time.
            </p>
          </div>
          <div style={{ marginTop: "14px" }}>
            <p style={styles.tipText2}>📌 Today's Reminder</p>
            <p style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
              Check soil moisture levels and water accordingly.
            </p>
          </div>
        </div>

      </div>

      {/* ── Recent Transactions ── */}
      <div style={styles.midGrid}>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <p style={styles.cardLabel}>🧾 Recent Expenses</p>
            <span style={styles.countBadge}>{expenses.length}</span>
          </div>
          {expenses.length === 0 ? (
            <p style={styles.emptyText}>No expenses added yet</p>
          ) : (
            expenses.slice(0, 4).map((e, i) => (
              <div key={i} style={styles.transactionRow}>
                <div>
                  <p style={styles.transactionName}>{e.crop_name}</p>
                  <p style={styles.transactionSub}>{e.description || e.category || "—"}</p>
                </div>
                <span style={{ ...styles.transactionAmount, color: "#e53e3e" }}>
                  - ₹{e.amount}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <p style={styles.cardLabel}>🛍 Recent Sales</p>
            <span style={styles.countBadge}>{sales.length}</span>
          </div>
          {sales.length === 0 ? (
            <p style={styles.emptyText}>No sales added yet</p>
          ) : (
            sales.slice(0, 4).map((s, i) => (
              <div key={i} style={styles.transactionRow}>
                <div>
                  <p style={styles.transactionName}>{s.crop_name}</p>
                  <p style={styles.transactionSub}>{s.purchaser_name || "—"}</p>
                </div>
                <span style={{ ...styles.transactionAmount, color: "#639922" }}>
                  + ₹{s.sale_amount}
                </span>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "28px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  loaderContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  /* Header */
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "24px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerSub: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#888",
  },
  headerActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnExpense: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3182ce",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  btnSale: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#639922",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },

  /* Stats */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
  },
  statLabel: {
    margin: 0,
    fontSize: "12px",
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    margin: "8px 0 0",
    fontSize: "26px",
    fontWeight: "700",
  },
  statIcon: {
    position: "absolute",
    right: "16px",
    top: "16px",
    fontSize: "28px",
    margin: 0,
    opacity: 0.25,
  },

  /* Cards */
  midGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  cardLabel: {
    margin: "0 0 4px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  countBadge: {
    backgroundColor: "#EAF3DE",
    color: "#3B6D11",
    fontSize: "12px",
    fontWeight: "600",
    padding: "2px 10px",
    borderRadius: "20px",
  },

  /* Farm Health */
  badge: {
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  insightText: {
    fontSize: "13px",
    color: "#555",
    margin: "8px 0 12px",
  },
  progressBg: {
    height: "6px",
    backgroundColor: "#f0f0f0",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "99px",
    transition: "width 0.5s ease",
  },
  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "#aaa",
    marginTop: "4px",
  },

  /* Tip Box */
  tipBox: {
    backgroundColor: "#EAF3DE",
    borderRadius: "8px",
    padding: "12px 14px",
    marginTop: "10px",
  },
  tipText: {
    margin: 0,
    fontSize: "13px",
    color: "#3B6D11",
    lineHeight: "1.6",
  },
  tipText2: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#1a1a1a",
  },

  /* Transactions */
  transactionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f5f5f5",
  },
  transactionName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  transactionSub: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#aaa",
  },
  transactionAmount: {
    fontSize: "14px",
    fontWeight: "700",
  },
  emptyText: {
    fontSize: "13px",
    color: "#aaa",
    textAlign: "center",
    padding: "20px 0",
  },
};

export default Dashboard;
