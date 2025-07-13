import React, { useState } from 'react';

const AdminManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('users');
  
  // State for users
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', name: 'Admin User', email: 'admin@example.com', role: 'Administrator', department: 'Administration', lastLogin: '2023-08-15 09:30', status: 'Active' },
    { id: 2, username: 'john.doe', name: 'John Doe', email: 'john.doe@example.com', role: 'Faculty', department: 'Computer Science', lastLogin: '2023-08-14 14:20', status: 'Active' },
    { id: 3, username: 'jane.smith', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Staff', department: 'Accounts', lastLogin: '2023-08-13 11:45', status: 'Active' },
    { id: 4, username: 'robert.johnson', name: 'Robert Johnson', email: 'robert.johnson@example.com', role: 'Faculty', department: 'Mechanical Engineering', lastLogin: '2023-08-10 16:15', status: 'Inactive' },
    { id: 5, username: 'sarah.williams', name: 'Sarah Williams', email: 'sarah.williams@example.com', role: 'Staff', department: 'Library', lastLogin: '2023-08-12 10:30', status: 'Active' },
  ]);
  
  // State for system logs
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, timestamp: '2023-08-15 09:30:45', user: 'admin', action: 'User Login', details: 'Admin user logged in', ipAddress: '192.168.1.100', status: 'Success' },
    { id: 2, timestamp: '2023-08-15 09:35:12', user: 'admin', action: 'User Created', details: 'Created user: john.doe', ipAddress: '192.168.1.100', status: 'Success' },
    { id: 3, timestamp: '2023-08-14 14:20:30', user: 'john.doe', action: 'User Login', details: 'John Doe logged in', ipAddress: '192.168.1.101', status: 'Success' },
    { id: 4, timestamp: '2023-08-14 14:30:15', user: 'john.doe', action: 'Record Updated', details: 'Updated student record: ST001', ipAddress: '192.168.1.101', status: 'Success' },
    { id: 5, timestamp: '2023-08-14 15:10:22', user: 'system', action: 'Backup Created', details: 'Daily backup created', ipAddress: '192.168.1.1', status: 'Success' },
    { id: 6, timestamp: '2023-08-13 11:45:33', user: 'jane.smith', action: 'User Login', details: 'Jane Smith logged in', ipAddress: '192.168.1.102', status: 'Success' },
    { id: 7, timestamp: '2023-08-13 12:05:18', user: 'jane.smith', action: 'Fee Collected', details: 'Fee collected for student: ST003', ipAddress: '192.168.1.102', status: 'Success' },
    { id: 8, timestamp: '2023-08-13 16:30:45', user: 'robert.johnson', action: 'User Login Failed', details: 'Invalid password attempt', ipAddress: '192.168.1.103', status: 'Failed' },
  ]);
  
  // State for system settings
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'EduERP - Student Management System',
    contactEmail: 'support@eduerp.com',
    sessionYear: '2023-2024',
    currentSemester: 'Fall 2023',
    maintenanceMode: false,
    backupFrequency: 'Daily',
    lastBackup: '2023-08-15 01:00:00',
    allowStudentRegistration: true,
    allowFacultyRegistration: false,
    maxLoginAttempts: 5,
    passwordExpiryDays: 90,
    notificationEmail: 'notifications@eduerp.com',
  });
  
  // State for new user form
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  
  // State for settings form
  const [settingsForm, setSettingsForm] = useState(systemSettings);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle user form change
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };
  
  // Handle settings form change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'checkbox' ? e.target.checked : value;
    setSettingsForm({
      ...settingsForm,
      [name]: newValue,
    });
  };
  
  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    const newUserEntry = {
      id: users.length + 1,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      lastLogin: 'Never',
      status: 'Active',
    };
    
    setUsers([...users, newUserEntry]);
    
    // Add to system logs
    const newLog = {
      id: systemLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'admin', // Assuming admin is creating the user
      action: 'User Created',
      details: `Created user: ${newUser.username}`,
      ipAddress: '192.168.1.100', // Placeholder IP
      status: 'Success',
    };
    
    setSystemLogs([newLog, ...systemLogs]);
    
    // Reset form
    setNewUser({
      username: '',
      name: '',
      email: '',
      role: '',
      department: '',
      password: '',
      confirmPassword: '',
    });
  };
  
  // Update user status
  const handleUpdateUserStatus = (id, newStatus) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: newStatus,
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // Add to system logs
    const user = users.find(u => u.id === id);
    const newLog = {
      id: systemLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'admin', // Assuming admin is updating the status
      action: 'User Status Updated',
      details: `Updated status for user: ${user.username} to ${newStatus}`,
      ipAddress: '192.168.1.100', // Placeholder IP
      status: 'Success',
    };
    
    setSystemLogs([newLog, ...systemLogs]);
  };
  
  // Save system settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSystemSettings(settingsForm);
    
    // Add to system logs
    const newLog = {
      id: systemLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'admin', // Assuming admin is updating settings
      action: 'System Settings Updated',
      details: 'System settings were updated',
      ipAddress: '192.168.1.100', // Placeholder IP
      status: 'Success',
    };
    
    setSystemLogs([newLog, ...systemLogs]);
    
    alert('Settings saved successfully!');
  };
  
  // Generate reports
  const handleGenerateReport = (reportType) => {
    alert(`Generating ${reportType} report... This would download a report in a real application.`);
    
    // Add to system logs
    const newLog = {
      id: systemLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'admin', // Assuming admin is generating the report
      action: 'Report Generated',
      details: `Generated ${reportType} report`,
      ipAddress: '192.168.1.100', // Placeholder IP
      status: 'Success',
    };
    
    setSystemLogs([newLog, ...systemLogs]);
  };
  
  // Trigger system backup
  const handleBackupSystem = () => {
    const backupTimestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    setSystemSettings({
      ...systemSettings,
      lastBackup: backupTimestamp,
    });
    
    // Add to system logs
    const newLog = {
      id: systemLogs.length + 1,
      timestamp: backupTimestamp,
      user: 'admin', // Assuming admin is triggering the backup
      action: 'Backup Created',
      details: 'Manual backup created',
      ipAddress: '192.168.1.100', // Placeholder IP
      status: 'Success',
    };
    
    setSystemLogs([newLog, ...systemLogs]);
    
    alert('System backup completed successfully!');
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Administration</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('users')}
        >
          User Management
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'logs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('logs')}
        >
          System Logs
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('settings')}
        >
          System Settings
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'reports' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('reports')}
        >
          Reports
        </button>
      </div>
      
      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Management</h2>
          </div>
          
          {/* Add User Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Staff">Staff</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={newUser.department}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Administration">Administration</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Library">Library</option>
                    <option value="Hostel">Hostel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={newUser.confirmPassword}
                    onChange={handleUserChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
          
          {/* User List Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">User List</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Department</th>
                  <th className="py-3 px-6 text-left">Last Login</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{user.username}</td>
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 text-left">{user.department}</td>
                    <td className="py-3 px-6 text-left">{user.lastLogin}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
                            handleUpdateUserStatus(user.id, newStatus);
                          }}
                          className={`${user.status === 'Active' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white text-xs py-1 px-2 rounded`}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* System Logs Tab */}
      {activeTab === 'logs' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">System Logs</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search logs..."
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
            </div>
          </div>
          
          {/* System Logs Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Timestamp</th>
                  <th className="py-3 px-6 text-left">User</th>
                  <th className="py-3 px-6 text-left">Action</th>
                  <th className="py-3 px-6 text-left">Details</th>
                  <th className="py-3 px-6 text-left">IP Address</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {systemLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{log.timestamp}</td>
                    <td className="py-3 px-6 text-left">{log.user}</td>
                    <td className="py-3 px-6 text-left">{log.action}</td>
                    <td className="py-3 px-6 text-left">{log.details}</td>
                    <td className="py-3 px-6 text-left">{log.ipAddress}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* System Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">System Settings</h2>
          </div>
          
          {/* Settings Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <form onSubmit={handleSaveSettings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="siteName">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={settingsForm.siteName}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactEmail">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={settingsForm.contactEmail}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sessionYear">
                    Session Year
                  </label>
                  <input
                    type="text"
                    id="sessionYear"
                    name="sessionYear"
                    value={settingsForm.sessionYear}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentSemester">
                    Current Semester
                  </label>
                  <input
                    type="text"
                    id="currentSemester"
                    name="currentSemester"
                    value={settingsForm.currentSemester}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="backupFrequency">
                    Backup Frequency
                  </label>
                  <select
                    id="backupFrequency"
                    name="backupFrequency"
                    value={settingsForm.backupFrequency}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notificationEmail">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    id="notificationEmail"
                    name="notificationEmail"
                    value={settingsForm.notificationEmail}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxLoginAttempts">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    id="maxLoginAttempts"
                    name="maxLoginAttempts"
                    value={settingsForm.maxLoginAttempts}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordExpiryDays">
                    Password Expiry (Days)
                  </label>
                  <input
                    type="number"
                    id="passwordExpiryDays"
                    name="passwordExpiryDays"
                    value={settingsForm.passwordExpiryDays}
                    onChange={handleSettingsChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    min="30"
                    max="365"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settingsForm.maintenanceMode}
                    onChange={handleSettingsChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 text-sm font-bold" htmlFor="maintenanceMode">
                    Maintenance Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowStudentRegistration"
                    name="allowStudentRegistration"
                    checked={settingsForm.allowStudentRegistration}
                    onChange={handleSettingsChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 text-sm font-bold" htmlFor="allowStudentRegistration">
                    Allow Student Registration
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowFacultyRegistration"
                    name="allowFacultyRegistration"
                    checked={settingsForm.allowFacultyRegistration}
                    onChange={handleSettingsChange}
                    className="mr-2"
                  />
                  <label className="text-gray-700 text-sm font-bold" htmlFor="allowFacultyRegistration">
                    Allow Faculty Registration
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <div>
                  <p className="text-sm">Last Backup: {systemSettings.lastBackup}</p>
                  <button
                    type="button"
                    onClick={handleBackupSystem}
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Backup Now
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Reports</h2>
          </div>
          
          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Student Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Student Enrollment')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Student Enrollment Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Student Attendance')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Student Attendance Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Student Performance')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Student Performance Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Student Demographics')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Student Demographics Report
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Faculty Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Faculty Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Faculty Workload')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Faculty Workload Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Faculty Attendance')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Faculty Attendance Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Faculty Performance')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Faculty Performance Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Faculty Leave')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Faculty Leave Report
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Financial Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Fee Collection')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Fee Collection Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Outstanding Fees')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Outstanding Fees Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Scholarship Distribution')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Scholarship Distribution Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Financial Summary')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Financial Summary Report
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Academic Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Academic Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Course Completion')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Course Completion Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Exam Results')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Examination Results Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Grade Distribution')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Grade Distribution Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Academic Calendar')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Academic Calendar Report
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Inventory Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Inventory Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Equipment Inventory')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Equipment Inventory Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Maintenance Schedule')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Maintenance Schedule Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Purchase Orders')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Purchase Orders Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Asset Depreciation')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Asset Depreciation Report
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Hostel Reports */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Hostel Reports</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Hostel Occupancy')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Hostel Occupancy Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Hostel Fee Collection')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Hostel Fee Collection Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Hostel Maintenance')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Hostel Maintenance Report
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleGenerateReport('Hostel Complaints')} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Hostel Complaints Report
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;