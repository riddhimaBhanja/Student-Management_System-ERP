import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Overview = () => {
  const { userRole, currentUser } = useAuth();

  // Mock data - In a real app, this would come from your API
  const stats = {
    admin: [
      { title: 'Total Students', value: '1,234', icon: '👨‍🎓', color: 'bg-blue-500' },
      { title: 'Faculty Members', value: '89', icon: '👨‍🏫', color: 'bg-green-500' },
      { title: 'Active Courses', value: '45', icon: '📚', color: 'bg-yellow-500' },
      { title: 'Departments', value: '12', icon: '🏛️', color: 'bg-purple-500' },
    ],
    faculty: [
      { title: 'My Classes', value: '6', icon: '📚', color: 'bg-blue-500' },
      { title: 'Total Students', value: '180', icon: '👨‍🎓', color: 'bg-green-500' },
      { title: 'Upcoming Events', value: '3', icon: '📅', color: 'bg-yellow-500' },
      { title: 'Assignments', value: '12', icon: '📝', color: 'bg-purple-500' },
    ],
    student: [
      { title: 'Courses Enrolled', value: '6', icon: '📚', color: 'bg-blue-500' },
      { title: 'Assignments Due', value: '4', icon: '📝', color: 'bg-yellow-500' },
      { title: 'Attendance', value: '92%', icon: '📊', color: 'bg-green-500' },
      { title: 'Library Books', value: '2', icon: '📖', color: 'bg-purple-500' },
    ],
  };

  const currentStats = stats[userRole] || stats.student;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {currentUser?.name || 'User'}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening in your {userRole} dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`rounded-full ${stat.color} text-white p-3`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {/* Activity items would go here - for now showing placeholder */}
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📌</span>
              <p>Welcome to your new dashboard! Start exploring the features available to you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
