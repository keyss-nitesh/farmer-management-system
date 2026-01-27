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

  const [loading, setLoading] = useState(true); // ✅ NEW

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  /* ================= TOKEN CHECK + DELAY ================= */
  useEffect(() => {
    const MIN_DELAY = 1200; // 👈 1.2 second
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
        <p style={{ marginTop: "10px" }}>Preparing expense form...</p>

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

  /* ================= DATA ================= */

  const cropOptions = {
    Vegetables: ["Tomato", "Shimla Mirch", "Cucumber", "Carrot", "Cabbage", "Spinach"],
    Grains: ["Wheat", "Rice", "Maize (Corn)", "Lentils (Masoor Dal)", "Chickpeas (Chana)"],
    Fruits: ["Strawberry", "Mango", "Banana", "Apple", "Papaya"],
    Herbs: ["Coriander", "Mint", "Basil (Tulsi)"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cropName) {
      alert("Please select a crop!");
      return;
    }

    const expense = {
      crop_name: cropName,
      date,
      description,
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

  /* ================= STYLES ================= */

  const containerStyle = {
    padding: "32px",
    maxWidth: "400px",
    margin: "50px auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3182ce",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  /* ================= JSX ================= */

  return (
    <div style={containerStyle}>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <select
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select a crop</option>
          {Object.entries(cropOptions).map(([category, crops]) => (
            <optgroup key={category} label={category}>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter where you expense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, e.target.value))}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;
