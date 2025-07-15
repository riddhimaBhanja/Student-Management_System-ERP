import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";

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
   const login = async (email, password, role) => {
      try {
         const response = await axios.post('/auth/login', { email, password });
         const { token, user } = response.data;
         
         // Store token and user data
         localStorage.setItem('token', token);
         localStorage.setItem('currentUser', JSON.stringify(user));
         localStorage.setItem('userRole', user.role);
         
         setCurrentUser(user);
         setUserRole(user.role);
         
         return user;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Login failed');
      }
   };

   // Function to handle user registration
   const register = async (name, email, password, role) => {
      try {
         const response = await axios.post('/auth/register', { name, email, password, role });
         return response.data;
      } catch (error) {
         throw new Error(error.response?.data?.message || 'Registration failed');
      }
   };

   // Function to handle user logout
   const logout = () => {
      setCurrentUser(null);
      setUserRole(null);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
      navigate("/");
   };

   // Check if user is authenticated
   const isAuthenticated = () => {
      return currentUser !== null && localStorage.getItem('token');
   };

   // Function to get current user from token
   const getCurrentUser = async () => {
      try {
         const token = localStorage.getItem('token');
         if (!token) {
            return null;
         }
         
         const response = await axios.get('/auth/me');
         const user = response.data;
         
         setCurrentUser(user);
         setUserRole(user.role);
         localStorage.setItem('currentUser', JSON.stringify(user));
         localStorage.setItem('userRole', user.role);
         
         return user;
      } catch (error) {
         // Token is invalid, clear storage
         localStorage.removeItem('token');
         localStorage.removeItem('currentUser');
         localStorage.removeItem('userRole');
         return null;
      }
   };

   // Effect to load user from localStorage on component mount
   useEffect(() => {
      const initAuth = async () => {
         const token = localStorage.getItem('token');
         const storedUser = localStorage.getItem("currentUser");
         
         if (token && storedUser) {
            try {
               // Verify token by getting current user
               await getCurrentUser();
            } catch (error) {
               // Token invalid, clear everything
               localStorage.removeItem('token');
               localStorage.removeItem('currentUser');
               localStorage.removeItem('userRole');
            }
         }
         setLoading(false);
      };
      
      initAuth();
   }, []);

   // Context value
   const value = {
      currentUser,
      userRole,
      login,
      logout,
      isAuthenticated,
      register,
      getCurrentUser,
   };

   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
