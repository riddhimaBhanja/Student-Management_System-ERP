import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { logout, currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define modules available for each role
  const roleModules = {
    admin: [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'students', name: 'Student Management', icon: '👨‍🎓' },
      { id: 'faculty', name: 'Faculty Management', icon: '👨‍🏫' },
      { id: 'academic', name: 'Academic Management', icon: '📚' },
      { id: 'finance', name: 'Finance Management', icon: '💰' },
      { id: 'library', name: 'Library Management', icon: '📖' },
      { id: 'inventory', name: 'Inventory Management', icon: '📦' },
      { id: 'hostel', name: 'Hostel Management', icon: '🏠' },
      { id: 'admin', name: 'Administration', icon: '⚙️' },
    ],
    faculty: [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'academic', name: 'Academic Management', icon: '📚' },
      { id: 'students', name: 'Student Records', icon: '👨‍🎓' },
      { id: 'library', name: 'Library', icon: '📖' },
    ],
    student: [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'academic', name: 'Academic Records', icon: '📚' },
      { id: 'finance', name: 'Fees & Payments', icon: '💰' },
      { id: 'library', name: 'Library', icon: '📖' },
      { id: 'hostel', name: 'Hostel', icon: '🏠' },
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
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              EduERP
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-1">
              {availableModules.map((module) => (
                <Link
                  key={module.id}
                  to={module.id}
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
            <h2 className="text-xl font-semibold text-gray-800">
              {getCurrentModuleName()}
            </h2>
          </div>
        </header>

        {/* Main Content - Render child routes */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;