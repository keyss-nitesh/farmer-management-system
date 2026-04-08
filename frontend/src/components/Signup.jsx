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
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, city }),
      });

      const data = await response.json();

      if (data.token) {
        dispatch(setAuth({ user: data.user, token: data.token }));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Logo / Header */}
        <div style={styles.logoBox}>
          <div style={styles.logoIcon}>🌾</div>
          <h1 style={styles.logoTitle}>FarmManager</h1>
          <p style={styles.logoSub}>Track your farm, grow your profit</p>
        </div>

        <div style={styles.divider} />

        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subHeading}>Join FarmManager for free</p>

        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...styles.input, paddingRight: '44px' }}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* City */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Your City</label>
            <div style={{ position: 'relative' }}>
              <span style={styles.cityIcon}>📍</span>
              <input
                type="text"
                placeholder="e.g. Ludhiana, Amritsar, Delhi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={{ ...styles.input, paddingLeft: '36px' }}
              />
            </div>
            <p style={styles.cityHint}>Used to send weather alerts for your crops 🌤️</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              ...styles.button,
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Creating Account...' : 'Create Free Account'}
          </button>

        </form>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.loginLink}>Log in here</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    fontFamily: 'Arial, sans-serif',
    padding: '24px',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '32px 28px',
    boxSizing: 'border-box',
  },
  logoBox: { textAlign: 'center', marginBottom: '20px' },
  logoIcon: { fontSize: '40px', marginBottom: '8px' },
  logoTitle: { margin: 0, fontSize: '22px', fontWeight: '700', color: '#3B6D11' },
  logoSub: { margin: '4px 0 0', fontSize: '13px', color: '#888' },
  divider: { height: '1px', backgroundColor: '#f0f0f0', marginBottom: '20px' },
  heading: { margin: '0 0 4px', fontSize: '20px', fontWeight: '700', color: '#1a1a1a' },
  subHeading: { margin: '0 0 20px', fontSize: '13px', color: '#888' },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid #fca5a5',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  eyeIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '16px',
    userSelect: 'none',
  },
  cityIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '15px',
    pointerEvents: 'none',
  },
  cityHint: { margin: '2px 0 0', fontSize: '11px', color: '#aaa' },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#639922',
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '4px',
    width: '100%',
  },
  loginText: { marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#555' },
  loginLink: { color: '#639922', textDecoration: 'none', fontWeight: '700', marginLeft: '4px' },
};

export default Signup;
