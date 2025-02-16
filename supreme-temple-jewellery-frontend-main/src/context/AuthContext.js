// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, role }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwt_decode(storedToken);
        setUser({ id: decoded.id, role: decoded.role });
        setToken(storedToken);
      } catch (err) {
        console.error('Failed to decode token:', err);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (userData, tokenData) => {
    setUser({ id: userData.id, role: userData.role });
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
