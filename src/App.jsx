import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Overview from './components/dashboard/Overview';
import StudentManagement from './components/student/StudentRegistration';
import FacultyManagement from './components/faculty/FacultyManagement';
import AcademicManagement from './components/academic/AcademicManagement';
import FinanceManagement from './components/finance/FinanceManagement';
import LibraryManagement from './components/library/LibraryManagement';
import InventoryManagement from './components/inventory/InventoryManagement';
import HostelManagement from './components/hostel/HostelManagement';
import AdminManagement from './components/admin/AdminManagement';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="faculty" element={<FacultyManagement />} />
          <Route path="academic" element={<AcademicManagement />} />
          <Route path="finance" element={<FinanceManagement />} />
          <Route path="library" element={<LibraryManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="hostel" element={<HostelManagement />} />
          <Route path="admin" element={<AdminManagement />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
