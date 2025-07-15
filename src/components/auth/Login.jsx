import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { login } = useAuth();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      role: "admin",
   });
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const params = new URLSearchParams(location.search);
      if (params.get("redirected")) {
         toast.info("You need to login to access.");
      }
   }, [location.search]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         await login(formData.email, formData.password, formData.role);
         navigate("/dashboard");
      } catch (error) {
         toast.error(error.message || "Login failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8 bg-white/90 p-10 rounded-3xl shadow-2xl border border-blue-200">
            <div className="flex flex-col items-center">
               <img
                  src="https://img.icons8.com/color/96/000000/student-male--v4.png"
                  alt="EduERP Logo"
                  className="mb-4 rounded-full shadow-lg"
               />
               <h2 className="text-4xl font-extrabold text-blue-700 mb-2">EduERP System</h2>
               <p className="text-base text-blue-500 font-medium">Sign in to access your dashboard</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
               <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-4">
                     <label htmlFor="email" className="block text-sm font-semibold text-blue-700 mb-1">
                        Email address
                     </label>
                     <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-blue-300 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="password" className="block text-sm font-semibold text-blue-700 mb-1">
                        Password
                     </label>
                     <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none block w-full px-4 py-3 border border-blue-300 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </div>
               </div>

               <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-semibold text-blue-700 mb-1">
                     Login As
                  </label>
                  <select
                     id="role"
                     name="role"
                     className="block w-full px-4 py-3 border border-blue-300 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base transition"
                     value={formData.role}
                     onChange={handleChange}
                  >
                     <option value="admin">Administrator</option>
                     <option value="faculty">Faculty</option>
                     <option value="student">Student</option>
                     <option value="staff">Staff</option>
                  </select>
               </div>

               <div className="mb-4">
                  <div className="flex items-center">
                     <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                     />
                     <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-700">
                        Remember me
                     </label>
                  </div>
                  <div className="text-sm">
                     <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition">
                        Forgot your password?
                     </a>
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 flex items-center justify-center"
               >
                  {loading ? (
                     <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
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
                  ) : (
                     <svg
                        className="h-5 w-5 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                     >
                        <path
                           fillRule="evenodd"
                           d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                           clipRule="evenodd"
                        />
                     </svg>
                  )}
                  {loading ? "Signing in..." : "Sign in"}
               </button>

               <div className="text-center mt-6">
                  <p className="text-sm text-blue-600">
                     Don't have an account?{" "}
                     <a href="/signup" className="font-bold text-blue-700 hover:underline transition">
                        Sign up
                     </a>
                  </p>
               </div>

               <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
                  <h3 className="text-sm font-semibold text-blue-700 mb-2">Demo Credentials</h3>
                  <div className="text-xs text-blue-500 space-y-1">
                     <p>Email: admin@example.com | Password: admin123 | Role: Administrator</p>
                     <p>Email: faculty@example.com | Password: faculty123 | Role: Faculty</p>
                     <p>Email: student@example.com | Password: student123 | Role: Student</p>
                     <p>Email: staff@example.com | Password: staff123 | Role: Staff</p>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
