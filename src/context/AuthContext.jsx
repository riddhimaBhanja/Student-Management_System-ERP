import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle user login
  const login = (username, password, role) => {
    // In a real application, this would make an API call to authenticate
    // For demo purposes, we'll just set the user as logged in
    const user = {
      id: '1',
      username,
      role,
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    setCurrentUser(user);
    setUserRole(role);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    return user;
  };

  // Function to handle user logout
  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Effect to load user from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Context value
  const value = {
    currentUser,
    userRole,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};