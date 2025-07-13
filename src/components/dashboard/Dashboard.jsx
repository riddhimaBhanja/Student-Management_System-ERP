import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import components (these would be actual imports in a real application)
const StudentRegistration = () => <div>Student Registration Component</div>;
const FacultyManagement = () => <div>Faculty Management Component</div>;
const AcademicManagement = () => <div>Academic Management Component</div>;
const FinanceManagement = () => <div>Finance Management Component</div>;
const LibraryManagement = () => <div>Library Management Component</div>;
const InventoryManagement = () => <div>Inventory Management Component</div>;
const HostelManagement = () => <div>Hostel Management Component</div>;
const AdminManagement = () => <div>Admin Management Component</div>;

const Dashboard = ({ userRole = 'admin' }) => {
  const [activeModule, setActiveModule] = useState('overview');
  const { logout, currentUser } = useAuth();

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
    staff: [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'students', name: 'Student Records', icon: '👨‍🎓' },
      { id: 'inventory', name: 'Inventory Management', icon: '📦' },
      { id: 'library', name: 'Library Management', icon: '📖' },
    ],
  };

  // Get modules for current role
  const availableModules = roleModules[userRole] || roleModules.student;

  // Stats for overview dashboard
  const stats = {
    admin: [
      { title: 'Total Students', value: '1,234', icon: '👨‍🎓', color: 'bg-blue-100 text-blue-800' },
      { title: 'Total Faculty', value: '98', icon: '👨‍🏫', color: 'bg-green-100 text-green-800' },
      { title: 'Courses', value: '56', icon: '📚', color: 'bg-yellow-100 text-yellow-800' },
      { title: 'Revenue (Monthly)', value: '₹ 12.5L', icon: '💰', color: 'bg-purple-100 text-purple-800' },
      { title: 'Pending Admissions', value: '45', icon: '📝', color: 'bg-red-100 text-red-800' },
      { title: 'Library Books', value: '15,890', icon: '📖', color: 'bg-indigo-100 text-indigo-800' },
    ],
    faculty: [
      { title: 'My Courses', value: '5', icon: '📚', color: 'bg-blue-100 text-blue-800' },
      { title: 'My Students', value: '120', icon: '👨‍🎓', color: 'bg-green-100 text-green-800' },
      { title: 'Pending Assignments', value: '12', icon: '📝', color: 'bg-yellow-100 text-yellow-800' },
      { title: 'Upcoming Exams', value: '3', icon: '📋', color: 'bg-purple-100 text-purple-800' },
    ],
    student: [
      { title: 'Enrolled Courses', value: '6', icon: '📚', color: 'bg-blue-100 text-blue-800' },
      { title: 'Attendance', value: '85%', icon: '📊', color: 'bg-green-100 text-green-800' },
      { title: 'Pending Assignments', value: '4', icon: '📝', color: 'bg-yellow-100 text-yellow-800' },
      { title: 'Fee Due', value: '₹ 25,000', icon: '💰', color: 'bg-red-100 text-red-800' },
    ],
    staff: [
      { title: 'Pending Tasks', value: '8', icon: '📋', color: 'bg-blue-100 text-blue-800' },
      { title: 'Inventory Items', value: '1,245', icon: '📦', color: 'bg-green-100 text-green-800' },
      { title: 'Maintenance Requests', value: '12', icon: '🔧', color: 'bg-yellow-100 text-yellow-800' },
      { title: 'Library Checkouts', value: '56', icon: '📖', color: 'bg-purple-100 text-purple-800' },
    ],
  };

  // Recent notifications
  const notifications = [
    { id: 1, message: 'New student admission request received', time: '10 minutes ago', read: false },
    { id: 2, message: 'Faculty meeting scheduled for tomorrow at 10 AM', time: '1 hour ago', read: false },
    { id: 3, message: 'End of semester examination schedule published', time: '3 hours ago', read: true },
    { id: 4, message: 'Library has added 50 new books to the collection', time: '1 day ago', read: true },
    { id: 5, message: 'System maintenance scheduled for this weekend', time: '2 days ago', read: true },
  ];

  // Recent activities
  const activities = [
    { id: 1, user: 'Admin', action: 'Added new faculty member', time: '15 minutes ago' },
    { id: 2, user: 'John Doe', action: 'Submitted assignment for CS101', time: '1 hour ago' },
    { id: 3, user: 'Jane Smith', action: 'Paid semester fees', time: '2 hours ago' },
    { id: 4, user: 'Prof. Robert', action: 'Uploaded exam results for ME202', time: '4 hours ago' },
    { id: 5, user: 'Librarian', action: 'Added 50 new books to inventory', time: '1 day ago' },
  ];

  // Render module content based on active module
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats[userRole]?.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notifications and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border-b pb-2 last:border-0">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className={`${notification.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                    View All Notifications
                  </button>
                </div>
              </div>

              {/* Activities */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border-b pb-2 last:border-0">
                      <p className="text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                    View All Activities
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableModules.slice(1, 5).map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className="p-4 border rounded-lg hover:bg-gray-50 text-center"
                  >
                    <div className="text-2xl mb-2">{module.icon}</div>
                    <div className="text-sm font-medium">{module.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'students':
        return <StudentRegistration />;
      case 'faculty':
        return <FacultyManagement />;
      case 'academic':
        return <AcademicManagement />;
      case 'finance':
        return <FinanceManagement />;
      case 'library':
        return <LibraryManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'hostel':
        return <HostelManagement />;
      case 'admin':
        return <AdminManagement />;
      default:
        return <div>Select a module from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">EduERP</h1>
          <p className="text-sm text-gray-600">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {availableModules.map((module) => (
              <li key={module.id}>
                <button
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center p-2 rounded-lg ${activeModule === module.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{module.icon}</span>
                  <span>{module.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold">
              {availableModules.find(m => m.id === activeModule)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-1">
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {userRole.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{currentUser?.name || 'User'}</span>
              </div>
              <button 
                onClick={logout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;