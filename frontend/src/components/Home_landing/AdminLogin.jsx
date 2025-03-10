

// // //uupdating above code so navbar do not rener in when admin is logges 

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = ({ setIsAdminLoggedIn }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3001/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();
//       console.log('Full response data:', data); 
//       if (response.ok) {
//         localStorage.setItem('token', data.token); // Store the token
//         window.localStorage.setItem("userType", data.role);
//         console.log("usertype is:", data.role);
              
//         window.localStorage.setItem("loggedIn", true); // Save loggedIn as true (as a string)
//         const loggedIn = window.localStorage.getItem("loggedIn"); // Retrieve the value to log
//         console.log("loggedin is:", loggedIn); // Log the value of loggedIn

//         setIsAdminLoggedIn(true); // Set the admin login state
//         alert(data.message);
//         navigate('/admin-home'); // Redirect to admin home page
//       } else {
//         alert(data.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       alert('Login failed. Please try again.');
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       alert('Both old and new passwords are required.');
//       return;
//     }
//     try {
//       const response = await fetch('http://localhost:3001/api/admin/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.error || 'Failed to change password. Please try again.');
//       }
//     } catch (error) {
//       alert('Failed to change password. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Login</h1>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input 
//             type="text" 
//             name="username" 
//             value={username} 
//             onChange={(e) => setUsername(e.target.value)} 
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input 
//             type="password" 
//             name="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
      
//       <h2>Change Password</h2>
//       <label>
//         Old Password:
//         <input 
//           type="password" 
//           value={oldPassword} 
//           onChange={(e) => setOldPassword(e.target.value)} 
//         />
//       </label>
//       <br />
//       <label>
//         New Password:
//         <input 
//           type="password" 
//           value={newPassword} 
//           onChange={(e) => setNewPassword(e.target.value)} 
//         />
//       </label>
//       <br />
//       <button onClick={handleChangePassword}>
//         Change Password
//       </button>
//     </div>
//   );
// };

// export default AdminLogin;


//before updating the protected routs for admin , after update login fxn bot working 


// import React, { useState  ,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// const AdminLogin = () => {
//   // State variables
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');

//   const navigate = useNavigate();
  
//   // Handle Admin Login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       alert('Username and password are required!');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       console.log('Full response data:', data);

//       if (response.ok) {
//         // Store data in localStorage
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('userType', data.role);
//         localStorage.setItem('loggedIn', 'true'); // Save as string

//         console.log('User type:', data.role);
//         console.log('Logged in:', localStorage.getItem('loggedIn'));
//         setIsLoggedIn
//         setUserType(role);
//         // Update state and navigate to admin home
       
//         alert(data.message);
//         console.log('Redirecting to /admin-home');
//         navigate('/admin-home');
//       } else {
//         alert(data.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred during login. Please try again.');
//       console.error(error);
//     }
//   };

//   // Handle Change Password
//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       alert('Both old and new passwords are required.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/admin/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.error || 'Failed to change password. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred while changing the password. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Login</h1>

//       {/* Login Form */}
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>

//       <h2>Change Password</h2>

//       {/* Change Password Form */}
//       <label>
//         Old Password:
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         New Password:
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleChangePassword}>Change Password</button>
//     </div>
//   );
// };

// export default AdminLogin;


// /setisloggedin/ appalying below


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = ({ setIsLoggedIn, setUserType }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPassword, setOldPassword] = useState('');

//   const navigate = useNavigate();

//   // Handle Admin Login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       alert('Username and password are required!');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       console.log('Full response data:', data);

//       if (response.ok) {
//         // Store data in localStorage
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('userType', data.role);
//         localStorage.setItem('loggedIn', 'true'); // Save as string

//         // Update state and navigate to admin home
//         setIsLoggedIn(true);
//         setUserType(data.role);

//         alert(data.message);
//         navigate('/admin-home');
//       } else {
//         alert(data.error || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred during login. Please try again.');
//       console.error(error);
//     }
//   };

//   // Handle Change Password
//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       alert('Both old and new passwords are required.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/admin/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.error || 'Failed to change password. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred while changing the password. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Login</h1>

//       {/* Login Form */}
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>

//       <h2>Change Password</h2>

//       {/* Change Password Form */}
//       <label>
//         Old Password:
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         New Password:
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleChangePassword}>Change Password</button>
//     </div>
//   );
// };

// export default AdminLogin;
// ------------------- Kabir
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setIsLoggedIn, setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  
  const navigate = useNavigate();

  // Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password) {
      setError('Username and password are required!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.role);
        localStorage.setItem('loggedIn', 'true'); // Save as string

        // Update state and navigate to admin home
        setIsLoggedIn(true);
        setUserType(data.role);

        alert(data.message);
        navigate('/admin-home');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  // Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!oldPassword || !newPassword) {
      setError('Both old and new passwords are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setOldPassword('');
        setNewPassword('');
        setShowPasswordChange(false);
      } else {
        setError(data.error || 'Failed to change password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while changing the password. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{backgroundColor:'#213547'}}  className="min-h-screen flex items-center justify-center">   
      <div className="relative w-full mt-10 max-w-md px-6 py-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl mx-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-white">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-br from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Admin Portal
          </h2>
          <p className="mt-3 text-gray-600">
            Access the administrative dashboard to manage the system
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {!showPasswordChange ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-indigo-600">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-indigo-600">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              }`}
            >
              {loading ? "Authenticating..." : "SIGN IN"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-indigo-600">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-indigo-600">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                  placeholder="Enter your new password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              }`}
            >
              {loading ? "Processing..." : "CHANGE PASSWORD"}
            </button>

            {/* <button
              type="button"
              onClick={() => setShowPasswordChange(false)}
              className="w-full py-3 px-4 rounded-lg text-gray-700 font-medium border border-gray-300 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              CANCEL
            </button> */}
          </form>
        )}

        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="text-sm text-indigo-600 hover:text-purple-600 transition-colors duration-300"
          >
            {showPasswordChange ? "Back to Login" : "Change Password?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;