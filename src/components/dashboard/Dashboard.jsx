import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: '📊', path: '/dashboard/overview' },
    { id: 'students', name: 'Student Management', icon: '👨‍🎓', path: '/dashboard/students' },
    { id: 'faculty', name: 'Faculty Management', icon: '👨‍🏫', path: '/dashboard/faculty' },
    { id: 'academic', name: 'Academic Management', icon: '📚', path: '/dashboard/academic' },
    { id: 'finance', name: 'Finance Management', icon: '💰', path: '/dashboard/finance' },
    { id: 'library', name: 'Library Management', icon: '📖', path: '/dashboard/library' },
    { id: 'inventory', name: 'Inventory Management', icon: '📦', path: '/dashboard/inventory' },
    { id: 'hostel', name: 'Hostel Management', icon: '🏠', path: '/dashboard/hostel' },
    { id: 'admin', name: 'Administration', icon: '⚙️', path: '/dashboard/admin' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Function to check if a menu item is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/dashboard" className="text-xl font-bold text-blue-600">
            EduERP
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-64 border-t bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {currentUser?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {currentUser?.email || 'user@example.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Logout"
            >
              <span className="text-xl">🚪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;