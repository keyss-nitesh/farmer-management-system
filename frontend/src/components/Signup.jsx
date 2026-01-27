// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAuth } from '../redux/slice';
// import { useNavigate, Link } from 'react-router-dom';

// function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:5000/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });
//     const data = await response.json();
//     if (data.token) {
//       dispatch(setAuth({ user: data.user, token: data.token }));
//       navigate('/');
//     } else {
//       alert('Signup failed');
//     }
//   };

//   const pageStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh', // Ensures full screen height for centering
//     height: '100vh', // Added for better centering
//     backgroundColor: '#f7fafc',
//     padding: '16px',
//     boxSizing: 'border-box',
//     width:'100vw',
//   };

//   const cardStyle = {
//     width: '100%',
//     maxWidth: '400px', // Limits width on large screens for readability
//     padding: '24px',
//     backgroundColor: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
//     boxSizing: 'border-box',
//   };

//   const headingStyle = {
//     textAlign: 'center',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '24px',
//     color: '#1a202c',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '16px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//     boxSizing: 'border-box',
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#1e90ff',
//     color: '#fff',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     marginBottom: '16px',
//     transition: 'background-color 0.3s',
//     boxSizing: 'border-box',
//   };

//   const linkStyle = {
//     color: '#1e90ff',
//     textDecoration: 'none',
//   };

//   // Responsive styles via <style> tag (media queries for full responsiveness, including desktop)
//   const responsiveStyles = `
//     /* Large Desktop (1024px and above) - Enhanced for desktop screens */
//     @media (min-width: 1024px) {
//       .signup-page {
//         padding: 20px !important;
//       }
//       .signup-card {
//         max-width: 500px !important; /* Wider card on large desktops */
//         padding: 32px !important; /* More padding for spacious look */
//       }
//       .signup-heading {
//         font-size: 28px !important; /* Larger heading */
//         margin-bottom: 28px !important;
//       }
//       .signup-input {
//         padding: 14px !important; /* Larger inputs */
//         font-size: 18px !important;
//         margin-bottom: 18px !important;
//       }
//       .signup-button {
//         padding: 14px !important;
//         font-size: 18px !important;
//       }
//       .signup-link {
//         font-size: 16px !important;
//       }
//     }

//     /* Tablet (768px and below) */
//     @media (max-width: 768px) {
//       .signup-page {
//         padding: 12px !important;
//       }
//       .signup-card {
//         padding: 20px !important;
//         max-width: 350px !important;
//       }
//       .signup-heading {
//         font-size: 22px !important;
//         margin-bottom: 20px !important;
//       }
//       .signup-input {
//         padding: 10px !important;
//         font-size: 15px !important;
//         margin-bottom: 14px !important;
//       }
//       .signup-button {
//         padding: 10px !important;
//         font-size: 15px !important;
//       }
//     }

//     /* Mobile (480px and below) */
//     @media (max-width: 480px) {
//       .signup-page {
//         padding: 8px !important;
//         min-height: 100vh !important; /* Ensures centering on mobile */
//       }
//       .signup-card {
//         padding: 16px !important;
//         max-width: 100% !important; /* Full width on mobile */
//         border-radius: 8px !important;
//       }
//       .signup-heading {
//         font-size: 20px !important;
//         margin-bottom: 16px !important;
//       }
//       .signup-input {
//         padding: 8px !important;
//         font-size: 14px !important;
//         margin-bottom: 12px !important;
//         border-radius: 6px !important;
//       }
//       .signup-button {
//         padding: 10px !important;
//         font-size: 14px !important;
//         border-radius: 6px !important;
//       }
//       .signup-link {
//         font-size: 12px !important;
//       }
//     }
//   `;

//   return (
//     <>
//       <style>{responsiveStyles}</style> {/* Inline responsive styles */}
//       <div style={pageStyle} className="signup-page">
//         <div style={cardStyle} className="signup-card">
//           <h2 style={headingStyle} className="signup-heading">Create your account</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={inputStyle}
//               className="signup-input"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={inputStyle}
//               className="signup-input"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={inputStyle}
//               className="signup-input"
//             />
//             <button
//               type="submit"
//               style={buttonStyle}
//               className="signup-button"
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#187bcd')}
//               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1e90ff')}
//             >
//               Create Free Account
//             </button>
//           </form>
//           <div style={{ textAlign: 'center', fontSize: '14px' }} className="signup-link">
//             Already have an account? <Link to="/login" style={linkStyle}>Log in here</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Signup;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slice';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (data.token) {
      // ✅ Redux update
      dispatch(setAuth({ user: data.user, token: data.token }));
      // ✅ Save token in localStorage
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert('Signup failed');
    }
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    height: '100vh',
    backgroundColor: '#f7fafc',
    padding: '16px',
    boxSizing: 'border-box',
    width: '100vw',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#1a202c',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '16px',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box',
  };

  const linkStyle = {
    color: '#1e90ff',
    textDecoration: 'none',
  };

  const responsiveStyles = `
    @media (min-width: 1024px) {
      .signup-page { padding: 20px !important; }
      .signup-card { max-width: 500px !important; padding: 32px !important; }
      .signup-heading { font-size: 28px !important; margin-bottom: 28px !important; }
      .signup-input { padding: 14px !important; font-size: 18px !important; margin-bottom: 18px !important; }
      .signup-button { padding: 14px !important; font-size: 18px !important; }
      .signup-link { font-size: 16px !important; }
    }
    @media (max-width: 768px) {
      .signup-page { padding: 12px !important; }
      .signup-card { padding: 20px !important; max-width: 350px !important; }
      .signup-heading { font-size: 22px !important; margin-bottom: 20px !important; }
      .signup-input { padding: 10px !important; font-size: 15px !important; margin-bottom: 14px !important; }
      .signup-button { padding: 10px !important; font-size: 15px !important; }
    }
    @media (max-width: 480px) {
      .signup-page { padding: 8px !important; min-height: 100vh !important; }
      .signup-card { padding: 16px !important; max-width: 100% !important; border-radius: 8px !important; }
      .signup-heading { font-size: 20px !important; margin-bottom: 16px !important; }
      .signup-input { padding: 8px !important; font-size: 14px !important; margin-bottom: 12px !important; border-radius: 6px !important; }
      .signup-button { padding: 10px !important; font-size: 14px !important; border-radius: 6px !important; }
      .signup-link { font-size: 12px !important; }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={pageStyle} className="signup-page">
        <div style={cardStyle} className="signup-card">
          <h2 style={headingStyle} className="signup-heading">Create your account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              className="signup-input"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
              className="signup-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
              className="signup-input"
            />
            <button
              type="submit"
              style={buttonStyle}
              className="signup-button"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#187bcd')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1e90ff')}
            >
              Create Free Account
            </button>
          </form>
          <div style={{ textAlign: 'center', fontSize: '14px' }} className="signup-link">
            Already have an account? <Link to="/login" style={linkStyle}>Log in here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
