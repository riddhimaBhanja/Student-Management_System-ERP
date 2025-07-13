import React, { useState } from 'react';

const FinanceManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('feeCollection');
  
  // State for fee collection
  const [feeRecords, setFeeRecords] = useState([
    { id: 1, studentId: 'STU001', name: 'John Doe', amount: 45000, semester: '1', paymentDate: '2023-07-15', paymentMode: 'Online', status: 'Paid' },
    { id: 2, studentId: 'STU002', name: 'Jane Smith', amount: 45000, semester: '1', paymentDate: '2023-07-18', paymentMode: 'Online', status: 'Paid' },
    { id: 3, studentId: 'STU003', name: 'Robert Johnson', amount: 45000, semester: '1', paymentDate: '', paymentMode: '', status: 'Pending' },
  ]);
  
  // State for refund requests
  const [refundRequests, setRefundRequests] = useState([
    { id: 1, studentId: 'STU004', name: 'Emily Brown', amount: 15000, reason: 'Course Withdrawal', requestDate: '2023-08-10', status: 'Pending' },
    { id: 2, studentId: 'STU005', name: 'Michael Wilson', amount: 5000, reason: 'Excess Payment', requestDate: '2023-08-05', status: 'Approved' },
    { id: 3, studentId: 'STU006', name: 'Sarah Davis', amount: 10000, reason: 'Fee Waiver Approved', requestDate: '2023-08-12', status: 'Processing' },
  ]);
  
  // State for scholarships
  const [scholarships, setScholarships] = useState([
    { id: 1, studentId: 'STU007', name: 'David Miller', scholarshipType: 'Merit Scholarship', amount: 25000, academicYear: '2023-24', status: 'Active' },
    { id: 2, studentId: 'STU008', name: 'Lisa Taylor', scholarshipType: 'Sports Scholarship', amount: 15000, academicYear: '2023-24', status: 'Active' },
    { id: 3, studentId: 'STU002', name: 'Jane Smith', scholarshipType: 'Financial Aid', amount: 35000, academicYear: '2023-24', status: 'Under Review' },
  ]);
  
  // State for new fee record form
  const [newFeeRecord, setNewFeeRecord] = useState({
    studentId: '',
    name: '',
    amount: '',
    semester: '',
    paymentMode: 'Online',
  });
  
  // State for new refund request form
  const [newRefundRequest, setNewRefundRequest] = useState({
    studentId: '',
    name: '',
    amount: '',
    reason: '',
  });
  
  // State for new scholarship form
  const [newScholarship, setNewScholarship] = useState({
    studentId: '',
    name: '',
    scholarshipType: '',
    amount: '',
    academicYear: '2023-24',
  });
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle fee record form change
  const handleFeeRecordChange = (e) => {
    const { name, value } = e.target;
    setNewFeeRecord({
      ...newFeeRecord,
      [name]: value,
    });
  };
  
  // Handle refund request form change
  const handleRefundRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRefundRequest({
      ...newRefundRequest,
      [name]: value,
    });
  };
  
  // Handle scholarship form change
  const handleScholarshipChange = (e) => {
    const { name, value } = e.target;
    setNewScholarship({
      ...newScholarship,
      [name]: value,
    });
  };
  
  // Add new fee record
  const handleAddFeeRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      id: feeRecords.length + 1,
      ...newFeeRecord,
      paymentDate: new Date().toISOString().split('T')[0],
      status: 'Paid',
    };
    setFeeRecords([...feeRecords, newRecord]);
    setNewFeeRecord({
      studentId: '',
      name: '',
      amount: '',
      semester: '',
      paymentMode: 'Online',
    });
  };
  
  // Add new refund request
  const handleAddRefundRequest = (e) => {
    e.preventDefault();
    const newRequest = {
      id: refundRequests.length + 1,
      ...newRefundRequest,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setRefundRequests([...refundRequests, newRequest]);
    setNewRefundRequest({
      studentId: '',
      name: '',
      amount: '',
      reason: '',
    });
  };
  
  // Add new scholarship
  const handleAddScholarship = (e) => {
    e.preventDefault();
    const newScholarshipEntry = {
      id: scholarships.length + 1,
      ...newScholarship,
      status: 'Under Review',
    };
    setScholarships([...scholarships, newScholarshipEntry]);
    setNewScholarship({
      studentId: '',
      name: '',
      scholarshipType: '',
      amount: '',
      academicYear: '2023-24',
    });
  };
  
  // Update refund status
  const handleUpdateRefundStatus = (id, newStatus) => {
    const updatedRequests = refundRequests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRefundRequests(updatedRequests);
  };
  
  // Update scholarship status
  const handleUpdateScholarshipStatus = (id, newStatus) => {
    const updatedScholarships = scholarships.map(scholarship => 
      scholarship.id === id ? { ...scholarship, status: newStatus } : scholarship
    );
    setScholarships(updatedScholarships);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finance Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'feeCollection' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('feeCollection')}
        >
          Fee Collection
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'refunds' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('refunds')}
        >
          Refunds
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'scholarships' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('scholarships')}
        >
          Scholarships & Waivers
        </button>
      </div>
      
      {/* Fee Collection Tab */}
      {activeTab === 'feeCollection' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Fee Collection</h2>
          </div>
          
          {/* Fee Collection Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Record New Payment</h3>
            <form onSubmit={handleAddFeeRecord}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={newFeeRecord.studentId}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newFeeRecord.name}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={newFeeRecord.amount}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={newFeeRecord.semester}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Semester</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMode">
                    Payment Mode
                  </label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    value={newFeeRecord.paymentMode}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Online">Online (UPI/Net Banking)</option>
                    <option value="Card">Debit/Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="DD">Demand Draft</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
          
          {/* Fee Records Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Fee Records</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Semester</th>
                  <th className="py-3 px-6 text-left">Payment Date</th>
                  <th className="py-3 px-6 text-left">Payment Mode</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {feeRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{record.studentId}</td>
                    <td className="py-3 px-6 text-left">{record.name}</td>
                    <td className="py-3 px-6 text-left">₹{record.amount.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">Semester {record.semester}</td>
                    <td className="py-3 px-6 text-left">{record.paymentDate || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{record.paymentMode || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${record.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Refunds Tab */}
      {activeTab === 'refunds' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Refund Management</h2>
          </div>
          
          {/* Refund Request Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">New Refund Request</h3>
            <form onSubmit={handleAddRefundRequest}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refundStudentId">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="refundStudentId"
                    name="studentId"
                    value={newRefundRequest.studentId}
                    onChange={handleRefundRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refundName">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="refundName"
                    name="name"
                    value={newRefundRequest.name}
                    onChange={handleRefundRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refundAmount">
                    Refund Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="refundAmount"
                    name="amount"
                    value={newRefundRequest.amount}
                    onChange={handleRefundRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Refund Amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refundReason">
                    Reason for Refund
                  </label>
                  <select
                    id="refundReason"
                    name="reason"
                    value={newRefundRequest.reason}
                    onChange={handleRefundRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Reason</option>
                    <option value="Course Withdrawal">Course Withdrawal</option>
                    <option value="Excess Payment">Excess Payment</option>
                    <option value="Fee Waiver Approved">Fee Waiver Approved</option>
                    <option value="Program Cancellation">Program Cancellation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          
          {/* Refund Requests Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Refund Requests</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Reason</th>
                  <th className="py-3 px-6 text-left">Request Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {refundRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{request.studentId}</td>
                    <td className="py-3 px-6 text-left">{request.name}</td>
                    <td className="py-3 px-6 text-left">₹{parseInt(request.amount).toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{request.reason}</td>
                    <td className="py-3 px-6 text-left">{request.requestDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            request.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {request.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUpdateRefundStatus(request.id, 'Approved')}
                            className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateRefundStatus(request.id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {request.status === 'Approved' && (
                        <button 
                          onClick={() => handleUpdateRefundStatus(request.id, 'Processing')}
                          className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Process
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Scholarships Tab */}
      {activeTab === 'scholarships' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Scholarships & Fee Waivers</h2>
          </div>
          
          {/* Scholarship Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">New Scholarship/Waiver</h3>
            <form onSubmit={handleAddScholarship}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scholarshipStudentId">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="scholarshipStudentId"
                    name="studentId"
                    value={newScholarship.studentId}
                    onChange={handleScholarshipChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scholarshipName">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="scholarshipName"
                    name="name"
                    value={newScholarship.name}
                    onChange={handleScholarshipChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scholarshipType">
                    Scholarship Type
                  </label>
                  <select
                    id="scholarshipType"
                    name="scholarshipType"
                    value={newScholarship.scholarshipType}
                    onChange={handleScholarshipChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Merit Scholarship">Merit Scholarship</option>
                    <option value="Sports Scholarship">Sports Scholarship</option>
                    <option value="Financial Aid">Financial Aid</option>
                    <option value="Cultural Scholarship">Cultural Scholarship</option>
                    <option value="Special Category">Special Category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scholarshipAmount">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="scholarshipAmount"
                    name="amount"
                    value={newScholarship.amount}
                    onChange={handleScholarshipChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="academicYear">
                    Academic Year
                  </label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={newScholarship.academicYear}
                    onChange={handleScholarshipChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Scholarship
                </button>
              </div>
            </form>
          </div>
          
          {/* Scholarships Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Scholarship Records</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Scholarship Type</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Academic Year</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {scholarships.map((scholarship) => (
                  <tr key={scholarship.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{scholarship.studentId}</td>
                    <td className="py-3 px-6 text-left">{scholarship.name}</td>
                    <td className="py-3 px-6 text-left">{scholarship.scholarshipType}</td>
                    <td className="py-3 px-6 text-left">₹{parseInt(scholarship.amount).toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{scholarship.academicYear}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${scholarship.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            scholarship.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {scholarship.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {scholarship.status === 'Under Review' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUpdateScholarshipStatus(scholarship.id, 'Active')}
                            className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateScholarshipStatus(scholarship.id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
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
        </div>
      )}
    </div>
  );
};

export default FinanceManagement;