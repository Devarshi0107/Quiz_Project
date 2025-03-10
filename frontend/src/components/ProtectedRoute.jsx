// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // Redirect to login page if no token is found
//     return <Navigate to="/login" />;
//   }

//   return children; // Render children if authenticated
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  console.log("i am frm rotected route ");
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return isLoggedIn==="true"?<Outlet/>:<Navigate to="login"/>;
}

export default ProtectedRoute;