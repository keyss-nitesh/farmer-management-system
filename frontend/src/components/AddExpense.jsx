// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addExpense } from '../redux/slice';
// import { useNavigate } from 'react-router-dom';

// function AddExpense() {
//   const [cropName, setCropName] = useState('');
//   const [date, setDate] = useState('');
//   const [amount, setAmount] = useState('');
//   const [description,setdescription]=useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.farm);

//   // Crop options grouped by category
//   const cropOptions = {
//     Vegetables: ['Tomato', 'Shimla Mirch', 'Cucumber', 'Carrot', 'Cabbage', 'Spinach'],
//     Grains: ['Wheat', 'Rice', 'Maize (Corn)', 'Lentils (Masoor Dal)', 'Chickpeas (Chana)'],
//     Fruits: ['Strawberry', 'Mango', 'Banana', 'Apple', 'Papaya'],
//     Herbs: ['Coriander', 'Mint', 'Basil (Tulsi)'],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!cropName) {
//       alert('Please select a crop!');
//       return;
//     }

//     const expense = { crop_name: cropName, date,description, amount };

//     try {
//       const res = await fetch('http://localhost:5000/api/expenses', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(expense),
//       });

//       if (res.ok) {
//         const savedExpense = await res.json();
//         dispatch(addExpense(savedExpense));
//         navigate('/');
//       } else {
//         const error = await res.text();
//         alert('Error adding expense: ' + error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Network error');
//     }
//   };

//   // Inline styles
//   const containerStyle = {
//     padding: '32px',
//     maxWidth: '400px',
//     margin: '50px auto',
//     backgroundColor: '#ffffff',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const headingStyle = {
//     fontSize: '24px',
//     marginBottom: '20px',
//     textAlign: 'center',
//     color: '#1a202c',
//   };

//   const formStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px',
//   };

//   const inputStyle = {
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//     outline: 'none',
//   };

//   const buttonStyle = {
//     padding: '12px',
//     borderRadius: '8px',
//     border: 'none',
//     backgroundColor: '#3182ce',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s ease',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headingStyle}>Add Expense</h2>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         {/* Crop Dropdown with categories */}
//         <select
//           value={cropName}
//           onChange={(e) => setCropName(e.target.value)}
//           required
//           style={inputStyle}
//         >
//           <option value="">Select a crop</option>
//           {Object.entries(cropOptions).map(([category, crops]) => (
//             <optgroup key={category} label={category}>
//               {crops.map((crop) => (
//                 <option key={crop} value={crop}>{crop}</option>
//               ))}
//             </optgroup>
//           ))}
//         </select>

//         {/* Date */}
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//           style={inputStyle}
//         />
//         <input type="text" 
//         value={description} 
//         onChange={(e)=>setdescription(e.target.value)} 
//         required style={inputStyle}
//          placeholder='Enter where you expense'
//          />

//         {/* Amount */}
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(Math.max(0, e.target.value))}
//           required
//           style={inputStyle}
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2b6cb0')}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3182ce')}
//         >
//           Add Expense
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddExpense;




import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function AddExpense() {
  const [cropName, setCropName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

    setTimeout(() => {
      setLoading(false);
    }, remaining);
  }, [token, navigate]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <BiLoaderAlt size={42} style={{ animation: "spin 1s linear infinite", color: "#639922" }} />
        <p style={{ marginTop: "10px", color: "#639922", fontWeight: "500" }}>
          Preparing expense form...
        </p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ================= DATA ================= */
  const cropOptions = {
    Vegetables: ["Tomato", "Shimla Mirch", "Cucumber", "Carrot", "Cabbage", "Spinach"],
    Grains: ["Wheat", "Rice", "Maize (Corn)", "Lentils (Masoor Dal)", "Chickpeas (Chana)"],
    Fruits: ["Strawberry", "Mango", "Banana", "Apple", "Papaya"],
    Herbs: ["Coriander", "Mint", "Basil (Tulsi)"],
  };

  const categories = ["Seeds", "Fertilizer", "Labour", "Pesticide", "Other"];

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cropName) {
      alert("Please select a crop!");
      return;
    }

    if (!category) {
      alert("Please select a category!");
      return;
    }

    const finalDescription =
      category === "Other"
        ? otherDescription
        : description;

    const expense = {
      crop_name: cropName,
      date,
      description: finalDescription,
      category,
      amount,
    };

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      if (res.ok) {
        const savedExpense = await res.json();
        dispatch(addExpense(savedExpense));
        navigate("/");
      } else {
        alert("Failed to add expense");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  /* ================= JSX ================= */
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div>
            <h2 style={styles.title}>Add Expense</h2>
            <p style={styles.subtitle}>Track your farm expenses</p>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Crop Select */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Crop</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              style={styles.input}
            >
              <option value="">Select a crop</option>
              {Object.entries(cropOptions).map(([cat, crops]) => (
                <optgroup key={cat} label={cat}>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Date */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Category Buttons */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Category</label>
            <div style={styles.categoryGrid}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    ...styles.categoryBtn,
                    ...(category === cat ? styles.categoryBtnActive : {}),
                    gridColumn: cat === "Other" ? "span 2" : "span 1",
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Other Description - only show when Other is selected */}
          {category === "Other" && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Specify Other</label>
              <input
                type="text"
                placeholder="Please describe your expense..."
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
                required
                style={{
                  ...styles.input,
                  borderColor: "#639922",
                  backgroundColor: "#f6fbee",
                  animation: "fadeIn 0.3s ease",
                }}
              />
              <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            </div>
          )}

          {/* Description (for non-other categories) */}
          {category !== "Other" && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Description</label>
              <input
                type="text"
                placeholder="Where did you spend?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          )}

          {/* Amount */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Amount (₹)</label>
            <div style={{ position: "relative" }}>
              <span style={styles.rupeeSymbol}>₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, e.target.value))}
                required
                style={{ ...styles.input, paddingLeft: "32px" }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Add Expense
          </button>

        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  loaderContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "28px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#EAF3DE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#888",
  },
  divider: {
    height: "1px",
    backgroundColor: "#f0f0f0",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "14px",
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  categoryBtn: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fafafa",
    fontSize: "13px",
    color: "#666",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
    userSelect: "none",
  },
  categoryBtnActive: {
    backgroundColor: "#EAF3DE",
    borderColor: "#639922",
    color: "#3B6D11",
    fontWeight: "600",
  },
  rupeeSymbol: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "15px",
    color: "#888",
    fontWeight: "500",
    pointerEvents: "none",
  },
  button: {
    padding: "13px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#639922",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    transition: "background 0.2s",
  },
};

export default AddExpense;
