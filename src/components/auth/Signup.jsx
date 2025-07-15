import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const Signup = () => {
   const navigate = useNavigate();
   const { register } = useAuth();
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "student", // Default role for signup
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await register(formData.name, formData.email, formData.password, formData.role);
         toast.success("Registration successful! Please login.");
         navigate("/login");
      } catch (error) {
         toast.error(error.message || "Registration failed.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
            <div>
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
               <p className="mt-2 text-center text-sm text-gray-600">Register to access the EduERP System</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
               <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                     <label htmlFor="name" className="sr-only">
                        Full Name
                     </label>
                     <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="email" className="sr-only">
                        Email address
                     </label>
                     <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="sr-only">
                        Password
                     </label>
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </div>
               </div>

               <div className="mt-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                     Register As
                  </label>
                  <select
                     id="role"
                     name="role"
                     className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-black"
                     value={formData.role}
                     onChange={handleChange}
                  >
                     <option value="student" className="text-black">
                        Student
                     </option>
                     <option value="faculty" className="text-black">
                        Faculty
                     </option>
                     <option value="staff" className="text-black">
                        Staff
                     </option>
                  </select>
               </div>

               <div>
                  <button
                     type="submit"
                     disabled={loading}
                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                     {loading ? (
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                           <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                           >
                              <circle
                                 className="opacity-25"
                                 cx="12"
                                 cy="12"
                                 r="10"
                                 stroke="currentColor"
                                 strokeWidth="4"
                              ></circle>
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                           </svg>
                        </span>
                     ) : (
                        "Sign up"
                     )}
                  </button>
               </div>

               <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                     Sign in
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Signup;
