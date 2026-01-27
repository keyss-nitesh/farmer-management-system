// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAuth } from '../redux/slice';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();
//     if (data.token) {
//       dispatch(setAuth({ user: data.user, token: data.token }));
//       navigate('/');
//     } else {
//       alert('Login failed');
//     }
//   };

//   /* ===== STYLES ===== */

//   // 🔥 PAGE WRAPPER (100vw)
//   const pageStyle = {
//     width: '100vw',
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f4f6f8',
//   };

//   // ✅ ACTUAL LOGIN CARD
//   const containerStyle = {
//     padding: '32px',
//     width: '100%',
//     maxWidth: '400px',
//     backgroundColor: '#ffffff',
//     boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
//     borderRadius: '12px',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const headingStyle = {
//     fontSize: '24px',
//     marginBottom: '16px',
//     textAlign: 'center',
//     color: '#333',
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
//   };

//   const buttonStyle = {
//     padding: '10px',
//     borderRadius: '8px',
//     border: 'none',
//     backgroundColor: '#28a745',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={containerStyle}>
//         <h2 style={headingStyle}>Login</h2>

//         <form onSubmit={handleSubmit} style={formStyle}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />

//           <button type="submit" style={buttonStyle}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Agar token already localStorage me hai, user ko home bhej do
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      dispatch(setAuth({ user: storedUser, token: storedToken }));
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.token) {
      // Redux store me set karo
      dispatch(setAuth({ user: data.user, token: data.token }));

      // LocalStorage me save karo
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  /* ===== STYLES ===== */

  const pageStyle = {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  };

  const containerStyle = {
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '16px',
    textAlign: 'center',
    color: '#333',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Login</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
