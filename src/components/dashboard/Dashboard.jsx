import React from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import components
import StudentRegistration from '../student/StudentRegistration';
import FacultyManagement from '../faculty/FacultyManagement';
import AcademicManagement from '../academic/AcademicManagement';
import FinanceManagement from '../finance/FinanceManagement';
import LibraryManagement from '../library/LibraryManagement';
import InventoryManagement from '../inventory/InventoryManagement';
import HostelManagement from '../hostel/HostelManagement';
import AdminManagement from '../admin/AdminManagement';
import Overview from '../dashboard/Overview';

const Dashboard = ({ userRole = 'admin' }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define modules available for each role
  const roleModules = {
    admin: [
      { id: 'overview', name: 'Overview', icon: '📊', component: Overview },
      { id: 'students', name: 'Student Management', icon: '👨‍🎓', component: StudentRegistration },
      { id: 'faculty', name: 'Faculty Management', icon: '👨‍🏫', component: FacultyManagement },
      { id: 'academic', name: 'Academic Management', icon: '📚', component: AcademicManagement },
      { id: 'finance', name: 'Finance Management', icon: '💰', component: FinanceManagement },
      { id: 'library', name: 'Library Management', icon: '📖', component: LibraryManagement },
      { id: 'inventory', name: 'Inventory Management', icon: '📦', component: InventoryManagement },
      { id: 'hostel', name: 'Hostel Management', icon: '🏠', component: HostelManagement },
      { id: 'admin', name: 'Administration', icon: '⚙️', component: AdminManagement },
    ],
    faculty: [
      { id: 'overview', name: 'Overview', icon: '📊', component: Overview },
      { id: 'academic', name: 'Academic Management', icon: '📚', component: AcademicManagement },
      { id: 'students', name: 'Student Records', icon: '👨‍🎓', component: StudentRegistration },
      { id: 'library', name: 'Library', icon: '📖', component: LibraryManagement },
    ],
    student: [
      { id: 'overview', name: 'Overview', icon: '📊', component: Overview },
      { id: 'academic', name: 'Academic Records', icon: '📚', component: AcademicManagement },
      { id: 'finance', name: 'Fees & Payments', icon: '💰', component: FinanceManagement },
      { id: 'library', name: 'Library', icon: '📖', component: LibraryManagement },
      { id: 'hostel', name: 'Hostel', icon: '🏠', component: HostelManagement },
    ],
    staff: [
      { id: 'overview', name: 'Overview', icon: '📊', component: Overview },
      { id: 'students', name: 'Student Records', icon: '👨‍🎓', component: StudentRegistration },
      { id: 'inventory', name: 'Inventory Management', icon: '📦', component: InventoryManagement },
      { id: 'library', name: 'Library Management', icon: '📖', component: LibraryManagement },
    ],
  };

  const availableModules = roleModules[userRole] || roleModules.student;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get current module name for breadcrumb
  const getCurrentModuleName = () => {
    const path = location.pathname.split('/').pop();
    return availableModules.find(m => m.id === path)?.name || 'Overview';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h1 className="text-xl font-bold text-gray-800">EduERP</h1>
              <p className="text-sm text-gray-600">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {availableModules.map((module) => (
                <Link
                  key={module.id}
                  to={module.id === 'overview' ? '.' : module.id}
                  className={`flex items-center px-2 py-2 text-base rounded-md ${
                    location.pathname.includes(module.id)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{module.icon}</span>
                  {module.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{currentUser?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-lg">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{getCurrentModuleName()}</h2>
            <div className="flex items-center space-x-4">
              {/* Add any header actions here */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Routes>
            {/* Default Overview Route */}
            <Route index element={<Overview />} />
            
            {/* Dynamic Routes based on available modules */}
            {availableModules.map((module) => (
              <Route
                key={module.id}
                path={module.id}
                element={<module.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;