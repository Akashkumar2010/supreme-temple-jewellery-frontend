// frontend/src/utils/ProtectedRoute.js

import React, { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';

function ProtectedRoute({ children, roles = [] }) {
  const { token } = useContext(AuthContext);
  let userRole = null;

  if (token) {
    try {
      const decoded = jwt_decode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error('Token decoding failed:', err);
    }
  }

  // Redirect to login if no token exists
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if the user's role does not match the allowed roles
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

// Define PropTypes for validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are React nodes and required
  roles: PropTypes.arrayOf(PropTypes.string), // Array of strings for roles
};

export default ProtectedRoute;
