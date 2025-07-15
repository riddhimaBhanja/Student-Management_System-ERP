import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
   return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   // Function to handle user login
   const login = async (email, password) => {
      // Replace with real API call
      // Example:
      // const response = await api.post('/auth/login', { email, password });
      // setCurrentUser(response.data.user);
      // setUserRole(response.data.user.role);
      // localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      // localStorage.setItem('userRole', response.data.user.role);
      // return response.data.user;
      const user = {
         id: "1",
         name: "John Doe",
         email,
         role: "student",
      };
      setCurrentUser(user);
      setUserRole(user.role);
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);
      return user;
   };

   // Function to handle user registration
   const register = async (name, email, password, role) => {
      // Replace with real API call
      // Example:
      // const response = await api.post('/auth/register', { name, email, password, role });
      // return response.data;
      // For demo, just resolve
      return { name, email, role };
   };

   // Function to handle user logout
   const logout = () => {
      setCurrentUser(null);
      setUserRole(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      navigate("/");
   };

   // Check if user is authenticated
   const isAuthenticated = () => {
      return currentUser !== null;
   };

   // Effect to load user from localStorage on component mount
   useEffect(() => {
      const user = localStorage.getItem("currentUser");
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
      isAuthenticated,
      register,
   };

   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
