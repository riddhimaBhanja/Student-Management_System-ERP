import React, { useState } from 'react';

const FacultyManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [facultyList, setFacultyList] = useState([
    {
      id: 1,
      employeeId: 'FAC001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      department: 'Computer Science & Engineering',
      designation: 'Assistant Professor',
      joiningDate: '2020-06-15',
      status: 'active'
    },
    {
      id: 2,
      employeeId: 'FAC002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '9876543211',
      department: 'Electronics & Communication Engineering',
      designation: 'Associate Professor',
      joiningDate: '2018-08-10',
      status: 'active'
    },
    {
      id: 3,
      employeeId: 'FAC003',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@example.com',
      phone: '9876543212',
      department: 'Mechanical Engineering',
      designation: 'Professor',
      joiningDate: '2015-03-22',
      status: 'active'
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: 'FAC001',
      employeeName: 'John Doe',
      leaveType: 'Sick Leave',
      startDate: '2023-07-10',
      endDate: '2023-07-12',
      reason: 'Medical treatment',
      status: 'approved',
      appliedOn: '2023-07-05'
    },
    {
      id: 2,
      employeeId: 'FAC002',
      employeeName: 'Jane Smith',
      leaveType: 'Casual Leave',
      startDate: '2023-07-15',
      endDate: '2023-07-16',
      reason: 'Personal work',
      status: 'pending',
      appliedOn: '2023-07-08'
    },
    {
      id: 3,
      employeeId: 'FAC003',
      employeeName: 'Robert Johnson',
      leaveType: 'Academic Leave',
      startDate: '2023-08-01',
      endDate: '2023-08-05',
      reason: 'Conference attendance',
      status: 'pending',
      appliedOn: '2023-07-20'
    }
  ]);

  // State for new faculty form
  const [newFaculty, setNewFaculty] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: ''
  });

  // State for new leave request form
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    employeeId: '',
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Handle faculty form input changes
  const handleFacultyInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty({
      ...newFaculty,
      [name]: value
    });
  };

  // Handle leave request form input changes
  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveRequest({
      ...newLeaveRequest,
      [name]: value
    });
  };

  // Add new faculty
  const handleAddFaculty = (e) => {
    e.preventDefault();
    const newId = facultyList.length > 0 ? Math.max(...facultyList.map(f => f.id)) + 1 : 1;
    const employeeId = `FAC${String(newId).padStart(3, '0')}`;
    
    const faculty = {
      id: newId,
      employeeId,
      ...newFaculty,
      status: 'active'
    };
    
    setFacultyList([...facultyList, faculty]);
    setNewFaculty({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      joiningDate: ''
    });
  };

  // Add new leave request
  const handleAddLeaveRequest = (e) => {
    e.preventDefault();
    const newId = leaveRequests.length > 0 ? Math.max(...leaveRequests.map(l => l.id)) + 1 : 1;
    
    // Find employee name based on employeeId
    const employee = facultyList.find(f => f.employeeId === newLeaveRequest.employeeId);
    const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
    
    const leaveRequest = {
      id: newId,
      employeeName,
      ...newLeaveRequest,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };
    
    setLeaveRequests([...leaveRequests, leaveRequest]);
    setNewLeaveRequest({
      employeeId: '',
      leaveType: 'Casual Leave',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  // Update leave request status
  const handleUpdateLeaveStatus = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(leave => 
      leave.id === id ? { ...leave, status: newStatus } : leave
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Faculty Management</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 ${activeTab === 'employees' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('employees')}
        >
          Employee Records
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'leave' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('leave')}
        >
          Leave Management
        </button>
      </div>
      
      {/* Employee Records Tab */}
      {activeTab === 'employees' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Faculty List</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addFacultyModal').classList.remove('hidden')}
            >
              Add New Faculty
            </button>
          </div>
          
          {/* Faculty Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{faculty.employeeId}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {faculty.firstName} {faculty.lastName}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">{faculty.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{faculty.department}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{faculty.designation}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{faculty.phone}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold rounded-full ${faculty.status === 'active' ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'}`}>
                        <span className="relative">{faculty.status === 'active' ? 'Active' : 'Inactive'}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Faculty Modal */}
          <div id="addFacultyModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Faculty</h3>
                <button 
                  onClick={() => document.getElementById('addFacultyModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddFaculty}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={newFaculty.firstName}
                      onChange={handleFacultyInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={newFaculty.lastName}
                      onChange={handleFacultyInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newFaculty.email}
                    onChange={handleFacultyInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newFaculty.phone}
                    onChange={handleFacultyInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={newFaculty.department}
                    onChange={handleFacultyInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                    Designation
                  </label>
                  <select
                    id="designation"
                    name="designation"
                    value={newFaculty.designation}
                    onChange={handleFacultyInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Lab Assistant">Lab Assistant</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joiningDate">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={newFaculty.joiningDate}
                    onChange={handleFacultyInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addFacultyModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Faculty
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Leave Management Tab */}
      {activeTab === 'leave' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leave Requests</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('addLeaveModal').classList.remove('hidden')}
            >
              Apply for Leave
            </button>
          </div>
          
          {/* Leave Requests Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{leave.employeeName}</p>
                          <p className="text-gray-600 whitespace-no-wrap">{leave.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{leave.leaveType}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{leave.startDate} to {leave.endDate}</p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1)} days
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{leave.reason}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{leave.appliedOn}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span 
                        className={`relative inline-block px-3 py-1 font-semibold rounded-full 
                          ${leave.status === 'approved' ? 'text-green-900 bg-green-200' : 
                            leave.status === 'rejected' ? 'text-red-900 bg-red-200' : 
                            'text-yellow-900 bg-yellow-200'}`}
                      >
                        <span className="relative capitalize">{leave.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {leave.status === 'pending' && (
                        <div>
                          <button 
                            onClick={() => handleUpdateLeaveStatus(leave.id, 'approved')}
                            className="text-green-600 hover:text-green-900 mr-2"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateLeaveStatus(leave.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Leave Request Modal */}
          <div id="addLeaveModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center hidden">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Apply for Leave</h3>
                <button 
                  onClick={() => document.getElementById('addLeaveModal').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddLeaveRequest}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                    Employee
                  </label>
                  <select
                    id="employeeId"
                    name="employeeId"
                    value={newLeaveRequest.employeeId}
                    onChange={handleLeaveInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Employee</option>
                    {facultyList.map(faculty => (
                      <option key={faculty.id} value={faculty.employeeId}>
                        {faculty.firstName} {faculty.lastName} ({faculty.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
                    Leave Type
                  </label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    value={newLeaveRequest.leaveType}
                    onChange={handleLeaveInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                    <option value="Academic Leave">Academic Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={newLeaveRequest.startDate}
                      onChange={handleLeaveInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={newLeaveRequest.endDate}
                      onChange={handleLeaveInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={newLeaveRequest.reason}
                    onChange={handleLeaveInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => document.getElementById('addLeaveModal').classList.add('hidden')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;