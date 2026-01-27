// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addSale } from '../redux/slice';
// import { useNavigate } from 'react-router-dom';

// function AddSale() {
//   const [cropName, setCropName] = useState('');
//   const [date, setDate] = useState('');
//   const [saleAmount, setSaleAmount] = useState('');
//   const [purchaserName, setPurchaserName] = useState('');

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

//     const sale = {
//       crop_name: cropName,
//       date,
//       sale_amount: saleAmount,
//       purchaser_name: purchaserName,
//     };

//     try {
//       const res = await fetch('http://localhost:5000/api/sales', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(sale),
//       });

//       if (res.ok) {
//         const savedSale = await res.json();
//         dispatch(addSale(savedSale));
//         navigate('/');
//       } else {
//         const error = await res.text();
//         alert('Error adding sale: ' + error);
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
//     backgroundColor: '#38a169',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s ease',
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headingStyle}>Add Sale</h2>
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

//         {/* Sale Amount */}
//         <input
//           type="number"
//           placeholder="Sale Amount"
//           value={saleAmount}
//           onChange={(e) => setSaleAmount(Math.max(0, e.target.value))}
//           required
//           style={inputStyle}
//         />

//         {/* Purchaser Name */}
//         <input
//           type="text"
//           placeholder="Purchaser Name"
//           value={purchaserName}
//           onChange={(e) => setPurchaserName(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2f855a')}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#38a169')}
//         >
//           Add Sale
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddSale;





import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSale } from "../redux/slice";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function AddSale() {
  const [cropName, setCropName] = useState("");
  const [date, setDate] = useState("");
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaserName, setPurchaserName] = useState("");

  const [loading, setLoading] = useState(true); // ✅ NEW

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ token from localStorage
  const token = localStorage.getItem("token");

  /* ================= TOKEN CHECK + DELAY ================= */
  useEffect(() => {
    const MIN_DELAY = 1200; // 👈 1.2 second minimum loader
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
        <p style={{ marginTop: "10px" }}>Preparing sale form...</p>

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

    const sale = {
      crop_name: cropName,
      date,
      sale_amount: saleAmount,
      purchaser_name: purchaserName,
    };

    try {
      const res = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sale),
      });

      if (res.ok) {
        const savedSale = await res.json();
        dispatch(addSale(savedSale));
        navigate("/");
      } else {
        alert("Error adding sale");
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

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#1a202c",
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
    backgroundColor: "#38a169",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  /* ================= JSX ================= */

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add Sale</h2>

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
          type="number"
          placeholder="Sale Amount"
          value={saleAmount}
          onChange={(e) => setSaleAmount(Math.max(0, e.target.value))}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Purchaser Name"
          value={purchaserName}
          onChange={(e) => setPurchaserName(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Add Sale
        </button>
      </form>
    </div>
  );
}

export default AddSale;
