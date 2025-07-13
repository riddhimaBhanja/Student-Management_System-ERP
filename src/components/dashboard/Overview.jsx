import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Overview = () => {
  const { userRole } = useAuth();

  const stats = [
    { title: 'Total Students', value: '2,453', change: '+12%', icon: '👨‍🎓' },
    { title: 'Faculty Members', value: '127', change: '+3%', icon: '👨‍🏫' },
    { title: 'Active Courses', value: '48', change: '0%', icon: '📚' },
    { title: 'Pending Tasks', value: '15', change: '-2%', icon: '📋' },
  ];

  const quickActions = [
    { title: 'Add Student', description: 'Register new student', icon: '➕', path: '/dashboard/students' },
    { title: 'View Schedule', description: 'Check timetable', icon: '📅', path: '/dashboard/academic' },
    { title: 'Assignments', description: 'Manage assignments', icon: '📝', path: '/dashboard/academic' },
    { title: 'Reports', description: 'View reports', icon: '📊', path: '/dashboard/admin' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'registration',
      description: 'New student registration completed',
      details: 'John Doe - Computer Science',
      time: '2 hours ago',
      icon: '👤',
    },
    {
      id: 2,
      type: 'academic',
      description: 'New assignment posted',
      details: 'Database Management - Due next week',
      time: '5 hours ago',
      icon: '📚',
    },
    {
      id: 3,
      type: 'announcement',
      description: 'Exam schedule announced',
      details: 'Mid-term examinations starting next month',
      time: '1 day ago',
      icon: '📢',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <span className="text-3xl mr-4">{stat.icon}</span>
              <div>
                <h2 className="text-gray-600 text-sm">{stat.title}</h2>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change === '0%' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button key={index} className="p-4 text-left hover:bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl mb-2 block">{action.icon}</span>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <span className="text-2xl mr-4">{activity.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.details}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
