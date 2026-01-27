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

    const MIN_DELAY = 1500; // 1.5 seconds
    const startTime = Date.now();

    const fetchData = async () => {
      try {
        const expenseRes = await fetch("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expenseData = await expenseRes.json();
        dispatch(setExpenses(expenseData));

        const saleRes = await fetch("http://localhost:5000/api/sales", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const saleData = await saleRes.json();
        dispatch(setSales(saleData));
      } catch (err) {
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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f4f6f8",
        }}
      >
        <BiLoaderAlt
          size={48}
          style={{
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ marginTop: "12px", fontSize: "15px" }}>
          Loading dashboard...
        </p>

        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  /* ================= NAVIGATION ================= */
  const goToAddExpense = () => navigate("/add-expense");
  const goToAddSale = () => navigate("/add-sale");

  /* ================= DERIVED INFO ================= */
  const farmStatus =
    profitLoss > 0 ? "Healthy" : profitLoss === 0 ? "Stable" : "Needs Attention";

  const insightMessage =
    profitLoss > 0
      ? "Your farm is generating profit. Keep monitoring expenses."
      : "Expenses are high. Try reducing unnecessary costs.";

  /* ================= STYLES ================= */
  const container = {
    padding: "30px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
    marginBottom: "40px",
  };

  const box = {
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const title = {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const button = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
    color: "#fff",
  };

  /* ================= JSX ================= */
  return (
    <div style={container}>
      <h1>🌾 Farm Dashboard</h1>
      <p>Hello {user?.name || "Farmer"}, here is today’s overview</p>

      <div style={grid}>
        <div style={{ ...box, background: "#fff5f5" }}>
          💸 <b>Total Expense</b>
          <h2>₹ {totalExpense}</h2>
        </div>

        <div style={{ ...box, background: "#ebf8ff" }}>
          🛒 <b>Total Sale</b>
          <h2>₹ {totalSale}</h2>
        </div>

        <div
          style={{
            ...box,
            background: profitLoss >= 0 ? "#f0fff4" : "#fff5f5",
          }}
        >
          📈 <b>Profit / Loss</b>
          <h2>₹ {profitLoss}</h2>
        </div>
      </div>

      <div style={grid}>
        <div style={box}>
          <div style={title}>🌱 Farm Health</div>
          <h2>{farmStatus}</h2>
          <p>{insightMessage}</p>
        </div>

        <div style={box}>
          <div style={title}>⚡ Quick Actions</div>
          <button
            style={{ ...button, background: "#3182ce" }}
            onClick={goToAddExpense}
          >
            ➕ Add Expense
          </button>
          <button
            style={{ ...button, background: "#38a169" }}
            onClick={goToAddSale}
          >
            ➕ Add Sale
          </button>
        </div>
      </div>

      <div style={grid}>
        <div style={box}>
          <div style={title}>🧾 Recent Expenses</div>
          {expenses.slice(0, 4).map((e, i) => (
            <p key={i}>
              {e.crop_name} — ₹{e.amount}
            </p>
          ))}
          {expenses.length === 0 && <p>No expenses added yet</p>}
        </div>

        <div style={box}>
          <div style={title}>🛍 Recent Sales</div>
          {sales.slice(0, 4).map((s, i) => (
            <p key={i}>
              {s.crop_name} — ₹{s.amount}
            </p>
          ))}
          {sales.length === 0 && <p>No sales added yet</p>}
        </div>
      </div>

      <div style={box}>
        <div style={title}>💡 Smart Farming Tip</div>
        <p>Crop rotation helps maintain soil fertility and reduces pest buildup.</p>
      </div>
    </div>
  );
}
export default Dashboard;
