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
  const [loading, setLoading] = useState(true);

  /* ================= TOKEN CHECK + DELAY ================= */
  useEffect(() => {
    const MIN_DELAY = 1200;
    const startTime = Date.now();

    if (!token) {
      navigate("/login");
      return;
    }

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(MIN_DELAY - elapsed, 0);
    setTimeout(() => setLoading(false), remaining);
  }, [token, navigate]);

  /* ================= REDUX DATA ================= */
  const { expenses = [], sales = [], totalExpense = 0, totalSale = 0 } =
    useSelector((state) => state.farm);

  const profitLoss = totalSale - totalExpense;

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

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <BiLoaderAlt size={42} style={{ animation: "spin 1s linear infinite", color: "#639922" }} />
        <p style={{ marginTop: "10px", color: "#639922", fontWeight: "500" }}>Preparing reports...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ================= JSX ================= */
  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>📊 Reports & Summary</h2>
          <p style={styles.pageSub}>Complete overview of your farm finances</p>
        </div>
        <button onClick={handleDownloadPDF} style={styles.pdfBtn}>
          ⬇ Download PDF
        </button>
      </div>

      {/* PDF Content starts here */}
      <div ref={reportRef}>



        {/* ── Per Crop Individual Tables ── */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>🌾 Per Crop Breakdown</h3>
            <span style={{ ...styles.badge, backgroundColor: "#EAF3DE", color: "#3B6D11" }}>
              {Object.keys(cropTotals).length} crops
            </span>
          </div>

          {Object.keys(cropTotals).length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", fontSize: "14px" }}>No crop data available</p>
          ) : (
            Object.entries(cropTotals).map(([crop, data], index) => {
              const pl = data.totalSale - data.totalExpense;
              const cropExpenses = expenses.filter((e) => e.crop_name === crop);
              const cropSales = sales.filter((s) => s.crop_name === crop);

              return (
                <div key={crop} style={{
                  ...styles.cropBlock,
                  marginTop: index === 0 ? "0" : "24px",
                }}>
                  {/* Crop Header */}
                  <div style={styles.cropHeader}>
                    <div style={styles.cropTitleRow}>
                      <span style={styles.cropEmoji}>🌿</span>
                      <h4 style={styles.cropName}>{crop}</h4>
                    </div>
                    <div style={styles.cropStats}>
                      <span style={styles.cropStatItem}>
                        <span style={{ color: "#3182ce", fontWeight: "700" }}>Sale: ₹{data.totalSale}</span>
                      </span>
                      <span style={styles.cropStatDivider}>|</span>
                      <span style={styles.cropStatItem}>
                        <span style={{ color: "#e53e3e", fontWeight: "700" }}>Expense: ₹{data.totalExpense}</span>
                      </span>
                      <span style={styles.cropStatDivider}>|</span>
                      <span style={styles.cropStatItem}>
                        <span style={{ color: pl >= 0 ? "#639922" : "#e53e3e", fontWeight: "700" }}>
                          P/L: {pl >= 0 ? "+" : ""}₹{pl}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Expenses Sub-table */}
                  {cropExpenses.length > 0 && (
                    <div style={{ marginBottom: "12px" }}>
                      <p style={styles.subTableLabel}>💸 Expenses</p>
                      <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                          <thead>
                            <tr>
                              <th style={{ ...styles.th, backgroundColor: "#fff5f5" }}>#</th>
                              <th style={{ ...styles.th, backgroundColor: "#fff5f5" }}>Date</th>
                              <th style={{ ...styles.th, backgroundColor: "#fff5f5" }}>Category / Description</th>
                              <th style={{ ...styles.th, backgroundColor: "#fff5f5" }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cropExpenses.map((e, i) => (
                              <tr key={e.id} style={i % 2 === 0 ? {} : { backgroundColor: "#fafafa" }}>
                                <td style={styles.td}>{i + 1}</td>
                                <td style={styles.td}>{e.date}</td>
                                <td style={styles.td}>{e.description || e.category || "—"}</td>
                                <td style={{ ...styles.td, color: "#e53e3e", fontWeight: "600" }}>₹{e.amount}</td>
                              </tr>
                            ))}
                            <tr style={{ backgroundColor: "#fff5f5" }}>
                              <td colSpan="3" style={{ ...styles.td, fontWeight: "700", textAlign: "right" }}>Total Expense:</td>
                              <td style={{ ...styles.td, color: "#e53e3e", fontWeight: "700" }}>₹{data.totalExpense}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Sales Sub-table */}
                  {cropSales.length > 0 && (
                    <div>
                      <p style={styles.subTableLabel}>🛍 Sales</p>
                      <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                          <thead>
                            <tr>
                              <th style={{ ...styles.th, backgroundColor: "#f0fff4" }}>#</th>
                              <th style={{ ...styles.th, backgroundColor: "#f0fff4" }}>Date</th>
                              <th style={{ ...styles.th, backgroundColor: "#f0fff4" }}>Purchaser</th>
                              <th style={{ ...styles.th, backgroundColor: "#f0fff4" }}>Payment</th>
                              <th style={{ ...styles.th, backgroundColor: "#f0fff4" }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cropSales.map((s, i) => (
                              <tr key={s.id} style={i % 2 === 0 ? {} : { backgroundColor: "#fafafa" }}>
                                <td style={styles.td}>{i + 1}</td>
                                <td style={styles.td}>{s.date}</td>
                                <td style={styles.td}>{s.purchaser_name || "—"}</td>
                                <td style={styles.td}>{s.payment_mode || "—"}</td>
                                <td style={{ ...styles.td, color: "#639922", fontWeight: "600" }}>₹{s.sale_amount}</td>
                              </tr>
                            ))}
                            <tr style={{ backgroundColor: "#f0fff4" }}>
                              <td colSpan="4" style={{ ...styles.td, fontWeight: "700", textAlign: "right" }}>Total Sale:</td>
                              <td style={{ ...styles.td, color: "#639922", fontWeight: "700" }}>₹{data.totalSale}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* P/L Footer */}
                  <div style={{
                    ...styles.plFooter,
                    backgroundColor: pl >= 0 ? "#EAF3DE" : "#fee2e2",
                    borderColor: pl >= 0 ? "#639922" : "#e53e3e",
                  }}>
                    <span style={{ fontSize: "14px", color: "#555" }}>Net Profit / Loss for {crop}:</span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: pl >= 0 ? "#3B6D11" : "#b91c1c" }}>
                      {pl >= 0 ? "+" : ""}₹{pl}
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
      {/* PDF Content ends here */}

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
  pageTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  pageSub: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#888",
  },
  pdfBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#639922",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },

  /* Stats */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "18px 20px",
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
    fontSize: "24px",
    fontWeight: "700",
  },
  statEmoji: {
    position: "absolute",
    right: "14px",
    top: "14px",
    fontSize: "26px",
    margin: 0,
    opacity: 0.2,
  },

  /* Section */
  section: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "20px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  badge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 12px",
    borderRadius: "20px",
  },

  /* Table */
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "500px",
    fontSize: "14px",
  },
  th: {
    padding: "10px 12px",
    textAlign: "left",
    fontWeight: "600",
    color: "#555",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    borderBottom: "1px solid #e0e0e0",
  },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #f0f0f0",
    color: "#333",
    fontSize: "14px",
  },
  emptyTd: {
    padding: "24px",
    textAlign: "center",
    color: "#aaa",
    fontSize: "14px",
  },

  /* Per Crop */
  cropBlock: {
    border: "1px solid #e8e8e8",
    borderRadius: "10px",
    padding: "16px",
    backgroundColor: "#fdfdfd",
  },
  cropHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "14px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f0f0f0",
  },
  cropTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cropEmoji: {
    fontSize: "20px",
  },
  cropName: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  cropStats: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  cropStatItem: {
    fontSize: "13px",
  },
  cropStatDivider: {
    color: "#ccc",
    fontSize: "13px",
  },
  subTableLabel: {
    margin: "0 0 8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#555",
  },
  plFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "14px",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid",
  },
};

export default Reports;

