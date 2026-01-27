// import React, { useRef } from 'react';
// import { useSelector } from 'react-redux';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function Reports() {
//   const { expenses = [], sales = [], totalExpense = 0, totalSale = 0 } = useSelector(
//     (state) => state.farm
//   );

//   // Helper: calculate per-crop totals
//   const getCropTotals = () => {
//     const cropTotals = {};
//     expenses.forEach((e) => {
//       if (!cropTotals[e.crop_name]) cropTotals[e.crop_name] = { totalExpense: 0, totalSale: 0 };
//       cropTotals[e.crop_name].totalExpense += Number(e.amount);
//     });
//     sales.forEach((s) => {
//       if (!cropTotals[s.crop_name]) cropTotals[s.crop_name] = { totalExpense: 0, totalSale: 0 };
//       cropTotals[s.crop_name].totalSale += Number(s.sale_amount);
//     });
//     return cropTotals;
//   };

//   const cropTotals = getCropTotals();

//   // Ref to capture the content
//   const reportRef = useRef();

//   // Download PDF handler
//   const handleDownloadPDF = async () => {
//     const element = reportRef.current;
//     const canvas = await html2canvas(element, { scale: 2 }); // better resolution
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('Farm_Report.pdf');
//   };

//   // Styles
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

//   const subHeadingStyle = {
//     fontSize: '20px',
//     marginBottom: '12px',
//     color: '#2d3748',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginBottom: '32px',
//   };

//   const thStyle = {
//     border: '1px solid #cbd5e0',
//     padding: '10px',
//     backgroundColor: '#edf2f7',
//     textAlign: 'center',
//   };

//   const tdStyle = {
//     border: '1px solid #cbd5e0',
//     padding: '10px',
//     textAlign: 'center',
//   };

//   const sectionStyle = { marginBottom: '24px' };

//   const buttonStyle = {
//     padding: '12px 24px',
//     marginBottom: '24px',
//     borderRadius: '8px',
//     border: 'none',
//     backgroundColor: '#3182ce',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     float: 'right',
//   };

//   return (
//     <div style={containerStyle} ref={reportRef}>
//       <button style={buttonStyle} onClick={handleDownloadPDF}>
//         Download PDF
//       </button>

//       <h2 style={mainHeadingStyle}>Reports / Summary</h2>

//       {/* Overall Summary */}
//       <div style={sectionStyle}>
//         <h3 style={subHeadingStyle}>Overall Summary</h3>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Total Sale</th>
//               <th style={thStyle}>Total Expense</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style={tdStyle}>₹{totalSale}</td>
//               <td style={tdStyle}>₹{totalExpense}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Expenses Table */}
//       <div style={sectionStyle}>
//         <h3 style={subHeadingStyle}>Expenses</h3>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Crop Name</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Description</th>
//               <th style={thStyle}>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenses.map((e) => (
//               <tr key={e.id}>
//                 <td style={tdStyle}>{e.crop_name}</td>
//                 <td style={tdStyle}>{e.date}</td>
//                 <td style={tdStyle}>{e.description}</td>
//                 <td style={tdStyle}>₹{e.amount}</td>
//               </tr>
//             ))}
//             {expenses.length === 0 && (
//               <tr>
//                 <td style={tdStyle} colSpan={3}>
//                   No expenses added yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Sales Table */}
//       <div style={sectionStyle}>
//         <h3 style={subHeadingStyle}>Sales</h3>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Crop Name</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Sale Amount</th>
//               <th style={thStyle}>Purchaser</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sales.map((s) => (
//               <tr key={s.id}>
//                 <td style={tdStyle}>{s.crop_name}</td>
//                 <td style={tdStyle}>{s.date}</td>
//                 <td style={tdStyle}>₹{s.sale_amount}</td>
//                 <td style={tdStyle}>{s.purchaser_name}</td>
//               </tr>
//             ))}
//             {sales.length === 0 && (
//               <tr>
//                 <td style={tdStyle} colSpan={4}>
//                   No sales added yet
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Per-crop totals */}
//       <div style={sectionStyle}>
//         <h3 style={subHeadingStyle}>Per Crop Totals</h3>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Crop Name</th>
//               <th style={thStyle}>Total Sale</th>
//               <th style={thStyle}>Total Expense</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(cropTotals).map(([crop, data]) => (
//               <tr key={crop}>
//                 <td style={tdStyle}>{crop}</td>
//                 <td style={tdStyle}>₹{data.totalSale}</td>
//                 <td style={tdStyle}>₹{data.totalExpense}</td>
//               </tr>
//             ))}
//             {Object.keys(cropTotals).length === 0 && (
//               <tr>
//                 <td style={tdStyle} colSpan={3}>
//                   No crops data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Reports;


import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BiLoaderAlt } from "react-icons/bi";

function Reports() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true); // ✅ LOADER

  /* ================= TOKEN CHECK + DELAY ================= */
  useEffect(() => {
    const MIN_DELAY = 1200; // 👈 same as AddSale
    const startTime = Date.now();

    if (!token) {
      navigate("/login");
      return;
    }

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(MIN_DELAY - elapsed, 0);

    setTimeout(() => {
      setLoading(false);
    }, remaining);
  }, [token, navigate]);

  /* ================= REDUX DATA ================= */
  const { expenses = [], sales = [], totalExpense = 0, totalSale = 0 } =
    useSelector((state) => state.farm);

  /* ================= CROP TOTALS ================= */
  const getCropTotals = () => {
    const cropTotals = {};
    expenses.forEach((e) => {
      if (!cropTotals[e.crop_name])
        cropTotals[e.crop_name] = { totalExpense: 0, totalSale: 0 };
      cropTotals[e.crop_name].totalExpense += Number(e.amount);
    });
    sales.forEach((s) => {
      if (!cropTotals[s.crop_name])
        cropTotals[s.crop_name] = { totalExpense: 0, totalSale: 0 };
      cropTotals[s.crop_name].totalSale += Number(s.sale_amount);
    });
    return cropTotals;
  };

  const cropTotals = getCropTotals();
  const reportRef = useRef();

  /* ================= PDF ================= */
  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Farm_Report.pdf");
  };

  /* ================= LOADER UI ================= */
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
          size={42}
          style={{ animation: "spin 1s linear infinite" }}
        />
        <p style={{ marginTop: "10px" }}>Preparing reports...</p>

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

  /* ================= STYLES ================= */
  const containerStyle = {
    padding: "16px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  };

  const tableWrapperStyle = { width: "100%", overflowX: "auto" };
  const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "600px" };
  const th = { border: "1px solid #cbd5e0", padding: "8px", background: "#edf2f7" };
  const td = { border: "1px solid #cbd5e0", padding: "8px", textAlign: "center" };

  /* ================= JSX ================= */
  return (
    <div style={containerStyle} ref={reportRef}>
      <button
        onClick={handleDownloadPDF}
        style={{
          float: "right",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#3182ce",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Download PDF
      </button>

      <h2 style={{ textAlign: "center" }}>Reports / Summary</h2>

      {/* SUMMARY */}
      <h3>Overall Summary</h3>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>Total Sale</th>
              <th style={th}>Total Expense</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>₹{totalSale}</td>
              <td style={td}>₹{totalExpense}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* EXPENSES */}
      <h3>Expenses</h3>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>Crop</th>
              <th style={th}>Date</th>
              <th style={th}>Description</th>
              <th style={th}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length ? (
              expenses.map((e) => (
                <tr key={e.id}>
                  <td style={td}>{e.crop_name}</td>
                  <td style={td}>{e.date}</td>
                  <td style={td}>{e.description}</td>
                  <td style={td}>₹{e.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={td} colSpan="4">No expenses added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SALES */}
      <h3>Sales</h3>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>Crop</th>
              <th style={th}>Date</th>
              <th style={th}>Sale</th>
              <th style={th}>Purchaser</th>
            </tr>
          </thead>
          <tbody>
            {sales.length ? (
              sales.map((s) => (
                <tr key={s.id}>
                  <td style={td}>{s.crop_name}</td>
                  <td style={td}>{s.date}</td>
                  <td style={td}>₹{s.sale_amount}</td>
                  <td style={td}>{s.purchaser_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={td} colSpan="4">No sales added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PER CROP TOTAL */}
      <h3>Per Crop Totals</h3>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={th}>Crop</th>
              <th style={th}>Total Sale</th>
              <th style={th}>Total Expense</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cropTotals).length ? (
              Object.entries(cropTotals).map(([crop, data]) => (
                <tr key={crop}>
                  <td style={td}>{crop}</td>
                  <td style={td}>₹{data.totalSale}</td>
                  <td style={td}>₹{data.totalExpense}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={td} colSpan="3">No crop data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
