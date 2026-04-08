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
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        dispatch(setAuth({ user: data.user, token: data.token }));
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Invalid email or password. Please try again.');
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

        {/* Divider */}
        <div style={styles.divider} />

        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subHeading}>Login to your account</p>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...styles.input, paddingRight: '44px' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              ...styles.button,
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* Signup Link */}
        <p style={styles.signupText}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
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

  /* Logo */
  logoBox: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoIcon: {
    fontSize: '40px',
    marginBottom: '8px',
  },
  logoTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#3B6D11',
  },
  logoSub: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#888',
  },

  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
    marginBottom: '20px',
  },

  heading: {
    margin: '0 0 4px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subHeading: {
    margin: '0 0 20px',
    fontSize: '13px',
    color: '#888',
  },

  /* Error */
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid #fca5a5',
  },

  /* Form */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
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
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#639922',
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '4px',
    transition: 'background 0.2s',
  },

  /* Signup */
  signupText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  signupLink: {
    color: '#639922',
    textDecoration: 'none',
    fontWeight: '700',
    marginLeft: '4px',
  },
};

export default Login;
