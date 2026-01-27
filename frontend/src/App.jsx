// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import store from './redux/store';
// import { setAuth, logout } from './redux/slice';

// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import AddExpense from './components/AddExpense';
// import AddSale from './components/AddSale';
// import Reports from './components/Reports';
// import Analytics from './components/Analytics';

// function AppContent() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.farm);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       const decoded = JSON.parse(atob(storedToken.split('.')[1]));
//       dispatch(setAuth({ user: decoded, token: storedToken }));
//     }
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem('token');
//   };

//   /* ================= STYLES ================= */

//   const layoutStyle = {
//     display: 'grid',
//     gridTemplateRows: 'auto 1fr', // navbar + content
//     height: '100vh',
//   };

//   const navStyle = {
//     width: '100vw',
//     backgroundColor: '#2d3748',
//     color: '#e2e8f0',
//     padding: '20px 40px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxSizing: 'border-box',
//     borderBottom: '4px solid #ed8936',
//     fontFamily: 'Verdana, sans-serif',
//     zIndex: 10,
//   };

//   const contentStyle = {
//     overflowY: 'auto', // 🔥 only content scrolls
//     padding: '0 20px 20px',
//   };

//   const linkContainerStyle = {
//     display: 'flex',
//     gap: '18px',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   };

//   const linkStyle = {
//     color: '#fbb6ce',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//     fontSize: '16px',
//     padding: '10px 15px',
//     borderRadius: '15px',
//   };

//   const logoutButtonStyle = {
//     backgroundColor: '#c53030',
//     color: '#fff',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '25px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   };

//   /* ================= GLOBAL CSS ================= */

//   const globalStyles = `
//     * {
//       box-sizing: border-box;
//     }

//     html, body {
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       height: 100%;
//       overflow: hidden; /* 🔥 stop body scroll */
//       font-family: Verdana, sans-serif;
//     }

//     @media (max-width: 768px) {
//       nav {
//         flex-direction: column;
//         padding: 15px 20px;
//         text-align: center;
//       }

//       .link-container {
//         flex-direction: column;
//         gap: 12px;
//         margin-top: 12px;
//       }
//     }
//   `;

//   return (
//     <>
//       <style>{globalStyles}</style>

//       <Router>
//         {user ? (
//           <div style={layoutStyle}>
//             {/* NAVBAR (NOT FIXED, GRID HANDLES IT) */}
//             <nav style={navStyle}>
//               <div>Welcome, {user.name}</div>

//               <div className="link-container" style={linkContainerStyle}>
//                 <Link to="/" style={linkStyle}>Dashboard</Link>
//                 <Link to="/add-expense" style={linkStyle}>Add Expense</Link>
//                 <Link to="/add-sale" style={linkStyle}>Add Sale</Link>
//                 <Link to="/reports" style={linkStyle}>Reports</Link>
//                 <Link to="/analytics" style={linkStyle}>Analytics</Link>
//                 <button onClick={handleLogout} style={logoutButtonStyle}>
//                   Logout
//                 </button>
//               </div>
//             </nav>

//             {/* SCROLLABLE CONTENT */}
//             <main style={contentStyle}>
//               <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//                 <Routes>
//                   <Route path="/" element={<Dashboard />} />
//                   <Route path="/add-expense" element={<AddExpense />} />
//                   <Route path="/add-sale" element={<AddSale />} />
//                   <Route path="/reports" element={<Reports />} />
//                   <Route path="/analytics" element={<Analytics />} />
//                   <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//               </div>
//             </main>
//           </div>
//         ) : (
//           <main
//             style={{
//               minHeight: '100vh',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               padding: '20px',
//             }}
//           >
//             <div style={{ width: '100%', maxWidth: '400px' }}>
//               <Routes>
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//               </Routes>
//             </div>
//           </main>
//         )}
//       </Router>
//     </>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { setAuth, logout } from './redux/slice';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AddSale from './components/AddSale';
import Reports from './components/Reports';
import Analytics from './components/Analytics';

function AppContent() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.farm);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      dispatch(setAuth({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    setShowMenu(false);
  };

  const layoutStyle = { display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh' };
  const navStyle = {
    width: '100vw',
    backgroundColor: '#2d3748',
    color: '#e2e8f0',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottom: '4px solid #ed8936',
    fontFamily: 'Verdana, sans-serif',
    position: 'relative',
  };
  const contentStyle = { overflowY: 'auto', padding: '0 20px 20px' };
  const linkContainerStyle = { display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' };
  const linkStyle = { color: '#fbb6ce', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', padding: '10px 15px', borderRadius: '15px' };
  const logoutButtonStyle = { backgroundColor: '#c53030', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' };

  const modalOverlayStyle = {
    position: 'fixed', top:0, left:0, right:0, bottom:0,
    backgroundColor:'rgba(0,0,0,0.5)',
    display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000,
  };
  const modalStyle = {
    backgroundColor:'#fff', padding:'30px', borderRadius:'12px',
    width:'90%', maxWidth:'400px', textAlign:'center',
    boxShadow:'0 4px 20px rgba(0,0,0,0.2)',
  };
  const modalButtonStyle = { padding:'10px 20px', margin:'10px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:'bold' };

  const globalStyles = `
    * { box-sizing: border-box; }
    html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; font-family: Verdana, sans-serif; }
  `;

  const mobileMenuStyle = {
    display: showMenu ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '12px',
    position: 'absolute',
    top: '70px',
    right: '20px',
    backgroundColor: '#2d3748',
    padding: '15px',
    borderRadius: '10px',
    width: '200px',
    zIndex: 999,
  };

  return (
    <>
      <style>{globalStyles}</style>

      <Router>
        {user ? (
          <div style={layoutStyle}>
            <nav style={navStyle}>
              <div>Welcome, {user.name}</div>

              {isMobile ? (
                <>
                  <div
                    style={{ fontSize: '28px', cursor: 'pointer', color:'#fbb6ce' }}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    ☰
                  </div>

                  <div style={mobileMenuStyle}>
                    <Link to="/" style={linkStyle} onClick={() => setShowMenu(false)}>Dashboard</Link>
                    <Link to="/add-expense" style={linkStyle} onClick={() => setShowMenu(false)}>Add Expense</Link>
                    <Link to="/add-sale" style={linkStyle} onClick={() => setShowMenu(false)}>Add Sale</Link>
                    <Link to="/reports" style={linkStyle} onClick={() => setShowMenu(false)}>Reports</Link>
                    <Link to="/analytics" style={linkStyle} onClick={() => setShowMenu(false)}>Analytics</Link>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      style={logoutButtonStyle}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div style={linkContainerStyle}>
                  <Link to="/" style={linkStyle}>Dashboard</Link>
                  <Link to="/add-expense" style={linkStyle}>Add Expense</Link>
                  <Link to="/add-sale" style={linkStyle}>Add Sale</Link>
                  <Link to="/reports" style={linkStyle}>Reports</Link>
                  <Link to="/analytics" style={linkStyle}>Analytics</Link>

                  {/* ✅ ONLY FIX IS HERE */}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    style={logoutButtonStyle}
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>

            <main style={contentStyle}>
              <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-expense" element={<AddExpense />} />
                  <Route path="/add-sale" element={<AddSale />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </main>

            {showLogoutModal && (
              <div style={modalOverlayStyle}>
                <div style={modalStyle}>
                  <h2>Confirm Logout</h2>
                  <p>Are you sure you want to logout?</p>
                  <div>
                    <button
                      style={{...modalButtonStyle, backgroundColor:'#c53030', color:'#fff'}}
                      onClick={handleLogout}
                    >
                      Yes, Logout
                    </button>
                    <button
                      style={{...modalButtonStyle, backgroundColor:'#718096', color:'#fff'}}
                      onClick={() => setShowLogoutModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <main style={{ minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center', padding:'20px' }}>
            <div style={{ width:'100%', maxWidth:'400px' }}>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </main>
        )}
      </Router>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
