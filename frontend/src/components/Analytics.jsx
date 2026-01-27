// import React from 'react';
// import { useSelector } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// function Analytics() {
//   const { expenses, sales } = useSelector((state) => state.farm);

//   // Mock monthly profit data
//   const data = [
//     { month: 'Jan', profit: 100 },
//     { month: 'Feb', profit: 200 },
//     { month: 'Mar', profit: 150 },
//     { month: 'Apr', profit: 300 },
//     { month: 'May', profit: 250 },
//     { month: 'Jun', profit: 400 },
//   ];

//   // Inline styles
//   const containerStyle = {
//     padding: '32px',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f9fafb',
//     minHeight: '100vh',
//   };

//   const mainHeadingStyle = {
//     fontSize: '28px',
//     marginBottom: '24px',
//     textAlign: 'center',
//     color: '#1a202c',
//   };

//   const cardStyle = {
//     backgroundColor: '#ffffff',
//     padding: '24px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     marginBottom: '16px',
//   };

//   const subHeadingStyle = {
//     fontSize: '20px',
//     marginBottom: '16px',
//     color: '#2d3748',
//   };

//   const noteStyle = {
//     marginTop: '16px',
//     color: '#718096',
//     fontSize: '14px',
//     textAlign: 'center',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={mainHeadingStyle}>Analytics</h2>
//       <div style={cardStyle}>
//         <h3 style={subHeadingStyle}>Monthly Profit Trend</h3>
//         <div style={{ width: '100%', height: '400px' }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <p style={noteStyle}>
//         Note: This chart uses mock data. In production, calculate profit from actual expenses and sales.
//       </p>
//     </div>
//   );
// }

// export default Analytics;




import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Analytics() {
  const navigate = useNavigate();
  const { user, expenses = [], sales = [] } = useSelector((state) => state.farm);

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  // Safe number parsing (handles commas, strings, nulls)
  const parseAmount = (value) => {
    if (value == null) return 0;
    const cleaned = String(value).replace(/,/g, '');
    const n = Number(cleaned);
    return isNaN(n) ? 0 : n;
  };

  // Monthly profit calculation (month-wise, across all years)
  const monthlyData = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const profitMap = Array(12).fill(0);
    const salesMap = Array(12).fill(0);
    const expenseMap = Array(12).fill(0);

    // Add sales
    sales.forEach(sale => {
      if (!sale.date) return;
      const d = new Date(sale.date);
      if (isNaN(d)) return;
      const monthIdx = d.getMonth();
      const amt = parseAmount(sale.sale_amount);
      profitMap[monthIdx] += amt;
      salesMap[monthIdx] += amt;
    });

    // Subtract expenses
    expenses.forEach(exp => {
      if (!exp.date) return;
      const d = new Date(exp.date);
      if (isNaN(d)) return;
      const monthIdx = d.getMonth();
      const amt = parseAmount(exp.amount);
      profitMap[monthIdx] -= amt;
      expenseMap[monthIdx] += amt;
    });

    // Build chart array
    return months.map((month, idx) => ({
      month,
      profit: profitMap[idx],
      sales: salesMap[idx],
      expenses: expenseMap[idx],
    }));
  }, [sales, expenses]);

  // Total profit
  const totalProfit = useMemo(() => monthlyData.reduce((acc, m) => acc + m.profit, 0), [monthlyData]);

  /* ================= STYLES ================= */
  const containerStyle = { padding:'32px', fontFamily:'Arial, sans-serif', backgroundColor:'#f9fafb', minHeight:'100vh' };
  const mainHeadingStyle = { fontSize:'28px', marginBottom:'24px', textAlign:'center', color:'#1a202c' };
  const cardStyle = { backgroundColor:'#fff', padding:'24px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', marginBottom:'16px' };
  const subHeadingStyle = { fontSize:'20px', marginBottom:'16px', color:'#2d3748' };
  const profitValueStyle = { fontSize:'22px', fontWeight:'bold', marginTop:'8px', color: totalProfit >= 0 ? 'green' : 'red' };
  const noteStyle = { marginTop:'16px', color:'#718096', fontSize:'14px', textAlign:'center' };

  return (
    <div style={containerStyle}>
      <h2 style={mainHeadingStyle}>
        Analytics {user ? `for ${user.name}` : ''}
      </h2>

      {/* Monthly Profit Chart */}
      <div style={cardStyle}>
        <h3 style={subHeadingStyle}>Monthly Profit Trend</h3>
        <div style={{ width:'100%', height:'400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={value => value.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#4caf50" strokeWidth={2} name="Sales" />
              <Line type="monotone" dataKey="expenses" stroke="#f44336" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Profit */}
      <div style={cardStyle}>
        <h3 style={subHeadingStyle}>Total Profit / Loss</h3>
        <p style={profitValueStyle}>{totalProfit.toLocaleString()}</p>
      </div>

      <p style={noteStyle}>
        Profit = Total Sales – Total Expenses (month-wise, across all years)
      </p>
    </div>
  );
}

export default Analytics;
