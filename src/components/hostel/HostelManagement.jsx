import React, { useState } from 'react';

const HostelManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('rooms');
  
  // State for hostel rooms
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: 'A-101', hostelName: 'Boys Hostel A', floor: '1', capacity: 2, occupancy: 2, status: 'Occupied', type: 'Standard', amenities: 'Attached Bathroom, Study Table, Cupboard', lastMaintenance: '2023-06-10' },
    { id: 2, roomNumber: 'A-102', hostelName: 'Boys Hostel A', floor: '1', capacity: 2, occupancy: 1, status: 'Partially Occupied', type: 'Standard', amenities: 'Attached Bathroom, Study Table, Cupboard', lastMaintenance: '2023-06-10' },
    { id: 3, roomNumber: 'B-201', hostelName: 'Girls Hostel B', floor: '2', capacity: 3, occupancy: 3, status: 'Occupied', type: 'Deluxe', amenities: 'Attached Bathroom, Study Table, Cupboard, AC', lastMaintenance: '2023-07-15' },
    { id: 4, roomNumber: 'B-202', hostelName: 'Girls Hostel B', floor: '2', capacity: 3, occupancy: 0, status: 'Vacant', type: 'Deluxe', amenities: 'Attached Bathroom, Study Table, Cupboard, AC', lastMaintenance: '2023-07-15' },
    { id: 5, roomNumber: 'C-301', hostelName: 'International Hostel', floor: '3', capacity: 1, occupancy: 1, status: 'Occupied', type: 'Premium', amenities: 'Attached Bathroom, Study Table, Cupboard, AC, Mini Fridge', lastMaintenance: '2023-08-05' },
  ]);
  
  // State for hostel residents
  const [residents, setResidents] = useState([
    { id: 1, studentId: 'ST001', name: 'Rahul Sharma', roomId: 1, roomNumber: 'A-101', hostelName: 'Boys Hostel A', checkInDate: '2023-07-01', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543210', guardianContact: '9876543211', status: 'Active', feeStatus: 'Paid' },
    { id: 2, studentId: 'ST002', name: 'Amit Kumar', roomId: 1, roomNumber: 'A-101', hostelName: 'Boys Hostel A', checkInDate: '2023-07-01', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543212', guardianContact: '9876543213', status: 'Active', feeStatus: 'Paid' },
    { id: 3, studentId: 'ST003', name: 'Priya Singh', roomId: 3, roomNumber: 'B-201', hostelName: 'Girls Hostel B', checkInDate: '2023-07-05', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543214', guardianContact: '9876543215', status: 'Active', feeStatus: 'Pending' },
    { id: 4, studentId: 'ST004', name: 'Neha Gupta', roomId: 3, roomNumber: 'B-201', hostelName: 'Girls Hostel B', checkInDate: '2023-07-05', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543216', guardianContact: '9876543217', status: 'Active', feeStatus: 'Paid' },
    { id: 5, studentId: 'ST005', name: 'Sneha Patel', roomId: 3, roomNumber: 'B-201', hostelName: 'Girls Hostel B', checkInDate: '2023-07-10', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543218', guardianContact: '9876543219', status: 'Active', feeStatus: 'Paid' },
    { id: 6, studentId: 'ST006', name: 'John Smith', roomId: 5, roomNumber: 'C-301', hostelName: 'International Hostel', checkInDate: '2023-08-01', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543220', guardianContact: '9876543221', status: 'Active', feeStatus: 'Paid' },
    { id: 7, studentId: 'ST007', name: 'Raj Malhotra', roomId: 2, roomNumber: 'A-102', hostelName: 'Boys Hostel A', checkInDate: '2023-07-15', plannedCheckOutDate: '2024-05-31', contactNumber: '9876543222', guardianContact: '9876543223', status: 'Active', feeStatus: 'Pending' },
  ]);
  
  // State for fee records
  const [feeRecords, setFeeRecords] = useState([
    { id: 1, studentId: 'ST001', name: 'Rahul Sharma', roomNumber: 'A-101', hostelName: 'Boys Hostel A', amount: 45000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '2023-07-10', paymentMethod: 'Online Transfer', transactionId: 'TXN123456', status: 'Paid', remarks: '' },
    { id: 2, studentId: 'ST002', name: 'Amit Kumar', roomNumber: 'A-101', hostelName: 'Boys Hostel A', amount: 45000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '2023-07-12', paymentMethod: 'Online Transfer', transactionId: 'TXN123457', status: 'Paid', remarks: '' },
    { id: 3, studentId: 'ST003', name: 'Priya Singh', roomNumber: 'B-201', hostelName: 'Girls Hostel B', amount: 50000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '', paymentMethod: '', transactionId: '', status: 'Pending', remarks: 'Requested extension' },
    { id: 4, studentId: 'ST004', name: 'Neha Gupta', roomNumber: 'B-201', hostelName: 'Girls Hostel B', amount: 50000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '2023-07-14', paymentMethod: 'Cheque', transactionId: 'CHQ987654', status: 'Paid', remarks: '' },
    { id: 5, studentId: 'ST005', name: 'Sneha Patel', roomNumber: 'B-201', hostelName: 'Girls Hostel B', amount: 50000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '2023-07-08', paymentMethod: 'Online Transfer', transactionId: 'TXN123458', status: 'Paid', remarks: '' },
    { id: 6, studentId: 'ST006', name: 'John Smith', roomNumber: 'C-301', hostelName: 'International Hostel', amount: 60000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-08-15', paidDate: '2023-08-10', paymentMethod: 'Online Transfer', transactionId: 'TXN123459', status: 'Paid', remarks: '' },
    { id: 7, studentId: 'ST007', name: 'Raj Malhotra', roomNumber: 'A-102', hostelName: 'Boys Hostel A', amount: 45000, period: 'Jul 2023 - Dec 2023', dueDate: '2023-07-15', paidDate: '', paymentMethod: '', transactionId: '', status: 'Pending', remarks: 'Scholarship pending' },
  ]);
  
  // State for complaints/maintenance requests
  const [complaints, setComplaints] = useState([
    { id: 1, roomNumber: 'A-101', hostelName: 'Boys Hostel A', reportedBy: 'Rahul Sharma', category: 'Plumbing', description: 'Leaking tap in bathroom', reportDate: '2023-08-05', status: 'Resolved', resolvedDate: '2023-08-07', assignedTo: 'Maintenance Staff', remarks: 'Fixed the leaking tap' },
    { id: 2, roomNumber: 'B-201', hostelName: 'Girls Hostel B', reportedBy: 'Priya Singh', category: 'Electrical', description: 'Fan not working properly', reportDate: '2023-08-10', status: 'In Progress', resolvedDate: '', assignedTo: 'Electrical Department', remarks: 'Technician scheduled for tomorrow' },
    { id: 3, roomNumber: 'C-301', hostelName: 'International Hostel', reportedBy: 'John Smith', category: 'Furniture', description: 'Broken chair leg', reportDate: '2023-08-12', status: 'Pending', resolvedDate: '', assignedTo: '', remarks: 'Waiting for new furniture' },
  ]);
  
  // State for new room form
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    hostelName: '',
    floor: '',
    capacity: '',
    type: 'Standard',
    amenities: '',
    lastMaintenance: new Date().toISOString().split('T')[0],
  });
  
  // State for new resident form
  const [newResident, setNewResident] = useState({
    studentId: '',
    name: '',
    roomId: '',
    contactNumber: '',
    guardianContact: '',
    checkInDate: new Date().toISOString().split('T')[0],
    plannedCheckOutDate: '',
  });
  
  // State for new fee record form
  const [newFeeRecord, setNewFeeRecord] = useState({
    studentId: '',
    amount: '',
    period: '',
    dueDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    transactionId: '',
    remarks: '',
  });
  
  // State for new complaint form
  const [newComplaint, setNewComplaint] = useState({
    roomNumber: '',
    hostelName: '',
    reportedBy: '',
    category: '',
    description: '',
    reportDate: new Date().toISOString().split('T')[0],
  });
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle room form change
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: value,
    });
  };
  
  // Handle resident form change
  const handleResidentChange = (e) => {
    const { name, value } = e.target;
    setNewResident({
      ...newResident,
      [name]: value,
    });
    
    // If room is selected, auto-fill hostel name
    if (name === 'roomId') {
      const selectedRoom = rooms.find(room => room.id === parseInt(value));
      if (selectedRoom) {
        setNewResident({
          ...newResident,
          roomId: value,
          roomNumber: selectedRoom.roomNumber,
          hostelName: selectedRoom.hostelName,
        });
      }
    }
  };
  
  // Handle fee record form change
  const handleFeeRecordChange = (e) => {
    const { name, value } = e.target;
    setNewFeeRecord({
      ...newFeeRecord,
      [name]: value,
    });
    
    // If student ID is selected, auto-fill student details
    if (name === 'studentId') {
      const selectedResident = residents.find(resident => resident.studentId === value);
      if (selectedResident) {
        setNewFeeRecord({
          ...newFeeRecord,
          studentId: value,
          name: selectedResident.name,
          roomNumber: selectedResident.roomNumber,
          hostelName: selectedResident.hostelName,
        });
      }
    }
  };
  
  // Handle complaint form change
  const handleComplaintChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint({
      ...newComplaint,
      [name]: value,
    });
    
    // If room number is selected, auto-fill hostel name
    if (name === 'roomNumber') {
      const selectedRoom = rooms.find(room => room.roomNumber === value);
      if (selectedRoom) {
        setNewComplaint({
          ...newComplaint,
          roomNumber: value,
          hostelName: selectedRoom.hostelName,
        });
      }
    }
  };
  
  // Add new room
  const handleAddRoom = (e) => {
    e.preventDefault();
    const newRoomEntry = {
      id: rooms.length + 1,
      ...newRoom,
      capacity: parseInt(newRoom.capacity),
      occupancy: 0,
      status: 'Vacant',
    };
    setRooms([...rooms, newRoomEntry]);
    setNewRoom({
      roomNumber: '',
      hostelName: '',
      floor: '',
      capacity: '',
      type: 'Standard',
      amenities: '',
      lastMaintenance: new Date().toISOString().split('T')[0],
    });
  };
  
  // Add new resident
  const handleAddResident = (e) => {
    e.preventDefault();
    
    // Find the selected room
    const selectedRoom = rooms.find(room => room.id === parseInt(newResident.roomId));
    
    if (!selectedRoom) {
      alert('Please select a valid room');
      return;
    }
    
    // Check if room has capacity
    if (selectedRoom.occupancy >= selectedRoom.capacity) {
      alert('Selected room is already at full capacity');
      return;
    }
    
    const newResidentEntry = {
      id: residents.length + 1,
      ...newResident,
      roomId: parseInt(newResident.roomId),
      status: 'Active',
      feeStatus: 'Pending',
    };
    
    setResidents([...residents, newResidentEntry]);
    
    // Update room occupancy and status
    const updatedRooms = rooms.map(room => {
      if (room.id === parseInt(newResident.roomId)) {
        const newOccupancy = room.occupancy + 1;
        const newStatus = newOccupancy === room.capacity ? 'Occupied' : 'Partially Occupied';
        return {
          ...room,
          occupancy: newOccupancy,
          status: newStatus,
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    
    setNewResident({
      studentId: '',
      name: '',
      roomId: '',
      contactNumber: '',
      guardianContact: '',
      checkInDate: new Date().toISOString().split('T')[0],
      plannedCheckOutDate: '',
    });
  };
  
  // Add new fee record
  const handleAddFeeRecord = (e) => {
    e.preventDefault();
    
    // Find the selected student
    const selectedResident = residents.find(resident => resident.studentId === newFeeRecord.studentId);
    
    if (!selectedResident) {
      alert('Please select a valid student');
      return;
    }
    
    const newRecord = {
      id: feeRecords.length + 1,
      ...newFeeRecord,
      amount: parseFloat(newFeeRecord.amount),
      status: newFeeRecord.transactionId ? 'Paid' : 'Pending',
      paidDate: newFeeRecord.transactionId ? new Date().toISOString().split('T')[0] : '',
    };
    
    setFeeRecords([...feeRecords, newRecord]);
    
    // Update resident fee status
    const updatedResidents = residents.map(resident => {
      if (resident.studentId === newFeeRecord.studentId) {
        return {
          ...resident,
          feeStatus: newFeeRecord.transactionId ? 'Paid' : 'Pending',
        };
      }
      return resident;
    });
    
    setResidents(updatedResidents);
    
    setNewFeeRecord({
      studentId: '',
      amount: '',
      period: '',
      dueDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      transactionId: '',
      remarks: '',
    });
  };
  
  // Add new complaint
  const handleAddComplaint = (e) => {
    e.preventDefault();
    const newComplaintEntry = {
      id: complaints.length + 1,
      ...newComplaint,
      status: 'Pending',
      resolvedDate: '',
      assignedTo: '',
      remarks: '',
    };
    setComplaints([...complaints, newComplaintEntry]);
    setNewComplaint({
      roomNumber: '',
      hostelName: '',
      reportedBy: '',
      category: '',
      description: '',
      reportDate: new Date().toISOString().split('T')[0],
    });
  };
  
  // Update complaint status
  const handleUpdateComplaintStatus = (id, status, assignedTo = '') => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        return {
          ...complaint,
          status,
          resolvedDate: status === 'Resolved' ? new Date().toISOString().split('T')[0] : '',
          assignedTo: assignedTo || complaint.assignedTo,
        };
      }
      return complaint;
    });
    setComplaints(updatedComplaints);
  };
  
  // Update fee payment status
  const handleUpdateFeeStatus = (id, status, transactionId = '', paymentMethod = '') => {
    const updatedFeeRecords = feeRecords.map(record => {
      if (record.id === id) {
        return {
          ...record,
          status,
          paidDate: status === 'Paid' ? new Date().toISOString().split('T')[0] : '',
          transactionId: transactionId || record.transactionId,
          paymentMethod: paymentMethod || record.paymentMethod,
        };
      }
      return record;
    });
    
    setFeeRecords(updatedFeeRecords);
    
    // Update resident fee status if needed
    if (status === 'Paid') {
      const feeRecord = feeRecords.find(record => record.id === id);
      if (feeRecord) {
        const updatedResidents = residents.map(resident => {
          if (resident.studentId === feeRecord.studentId) {
            return {
              ...resident,
              feeStatus: 'Paid',
            };
          }
          return resident;
        });
        setResidents(updatedResidents);
      }
    }
  };
  
  // Handle resident checkout
  const handleCheckout = (id) => {
    // Find the resident to checkout
    const residentToCheckout = residents.find(resident => resident.id === id);
    
    if (!residentToCheckout) return;
    
    // Update resident status
    const updatedResidents = residents.map(resident => {
      if (resident.id === id) {
        return {
          ...resident,
          status: 'Checked Out',
          checkOutDate: new Date().toISOString().split('T')[0],
        };
      }
      return resident;
    });
    
    setResidents(updatedResidents);
    
    // Update room occupancy and status
    const updatedRooms = rooms.map(room => {
      if (room.id === residentToCheckout.roomId) {
        const newOccupancy = room.occupancy - 1;
        let newStatus = 'Vacant';
        if (newOccupancy > 0) {
          newStatus = newOccupancy === room.capacity ? 'Occupied' : 'Partially Occupied';
        }
        return {
          ...room,
          occupancy: newOccupancy,
          status: newStatus,
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hostel Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'rooms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('rooms')}
        >
          Room Management
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'residents' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('residents')}
        >
          Resident Management
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'fees' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('fees')}
        >
          Fee Management
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'complaints' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('complaints')}
        >
          Complaints & Maintenance
        </button>
      </div>
      
      {/* Room Management Tab */}
      {activeTab === 'rooms' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Room Management</h2>
          </div>
          
          {/* Add Room Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Room</h3>
            <form onSubmit={handleAddRoom}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
                    Room Number
                  </label>
                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={newRoom.roomNumber}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Room Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hostelName">
                    Hostel Name
                  </label>
                  <select
                    id="hostelName"
                    name="hostelName"
                    value={newRoom.hostelName}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Hostel</option>
                    <option value="Boys Hostel A">Boys Hostel A</option>
                    <option value="Boys Hostel B">Boys Hostel B</option>
                    <option value="Girls Hostel A">Girls Hostel A</option>
                    <option value="Girls Hostel B">Girls Hostel B</option>
                    <option value="International Hostel">International Hostel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floor">
                    Floor
                  </label>
                  <input
                    type="text"
                    id="floor"
                    name="floor"
                    value={newRoom.floor}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Floor"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={newRoom.capacity}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Capacity"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Room Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newRoom.type}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastMaintenance">
                    Last Maintenance Date
                  </label>
                  <input
                    type="date"
                    id="lastMaintenance"
                    name="lastMaintenance"
                    value={newRoom.lastMaintenance}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amenities">
                    Amenities
                  </label>
                  <textarea
                    id="amenities"
                    name="amenities"
                    value={newRoom.amenities}
                    onChange={handleRoomChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Amenities (comma separated)"
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
          
          {/* Room List Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Room List</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Room Number</th>
                  <th className="py-3 px-6 text-left">Hostel</th>
                  <th className="py-3 px-6 text-left">Floor</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Capacity</th>
                  <th className="py-3 px-6 text-left">Occupancy</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Amenities</th>
                  <th className="py-3 px-6 text-left">Last Maintenance</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{room.roomNumber}</td>
                    <td className="py-3 px-6 text-left">{room.hostelName}</td>
                    <td className="py-3 px-6 text-left">{room.floor}</td>
                    <td className="py-3 px-6 text-left">{room.type}</td>
                    <td className="py-3 px-6 text-left">{room.capacity}</td>
                    <td className="py-3 px-6 text-left">{room.occupancy}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${room.status === 'Vacant' ? 'bg-green-100 text-green-800' : 
                            room.status === 'Partially Occupied' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{room.amenities}</td>
                    <td className="py-3 px-6 text-left">{room.lastMaintenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Resident Management Tab */}
      {activeTab === 'residents' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Resident Management</h2>
          </div>
          
          {/* Add Resident Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Resident</h3>
            <form onSubmit={handleAddResident}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={newResident.studentId}
                    onChange={handleResidentChange}
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
                    value={newResident.name}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Student Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomId">
                    Room
                  </label>
                  <select
                    id="roomId"
                    name="roomId"
                    value={newResident.roomId}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Room</option>
                    {rooms.filter(room => room.occupancy < room.capacity).map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomNumber} - {room.hostelName} ({room.occupancy}/{room.capacity})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={newResident.contactNumber}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Contact Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardianContact">
                    Guardian Contact
                  </label>
                  <input
                    type="text"
                    id="guardianContact"
                    name="guardianContact"
                    value={newResident.guardianContact}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Guardian Contact"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkInDate">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={newResident.checkInDate}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plannedCheckOutDate">
                    Planned Check-out Date
                  </label>
                  <input
                    type="date"
                    id="plannedCheckOutDate"
                    name="plannedCheckOutDate"
                    value={newResident.plannedCheckOutDate}
                    onChange={handleResidentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newResident.roomId}
                >
                  Add Resident
                </button>
              </div>
            </form>
          </div>
          
          {/* Resident List Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Resident List</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Student ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Room</th>
                  <th className="py-3 px-6 text-left">Hostel</th>
                  <th className="py-3 px-6 text-left">Check-in Date</th>
                  <th className="py-3 px-6 text-left">Planned Check-out</th>
                  <th className="py-3 px-6 text-left">Contact</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Fee Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {residents.map((resident) => (
                  <tr key={resident.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{resident.studentId}</td>
                    <td className="py-3 px-6 text-left">{resident.name}</td>
                    <td className="py-3 px-6 text-left">{resident.roomNumber}</td>
                    <td className="py-3 px-6 text-left">{resident.hostelName}</td>
                    <td className="py-3 px-6 text-left">{resident.checkInDate}</td>
                    <td className="py-3 px-6 text-left">{resident.plannedCheckOutDate}</td>
                    <td className="py-3 px-6 text-left">{resident.contactNumber}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${resident.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}
                      >
                        {resident.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${resident.feeStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {resident.feeStatus}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {resident.status === 'Active' && (
                        <button
                          onClick={() => handleCheckout(resident.id)}
                          className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Check-out
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
      
      {/* Fee Management Tab */}
      {activeTab === 'fees' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Fee Management</h2>
          </div>
          
          {/* Add Fee Record Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Fee Record</h3>
            <form onSubmit={handleAddFeeRecord}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                    Student
                  </label>
                  <select
                    id="studentId"
                    name="studentId"
                    value={newFeeRecord.studentId}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Student</option>
                    {residents.filter(resident => resident.status === 'Active').map(resident => (
                      <option key={resident.id} value={resident.studentId}>
                        {resident.studentId} - {resident.name} ({resident.roomNumber})
                      </option>
                    ))}
                  </select>
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
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="period">
                    Period
                  </label>
                  <input
                    type="text"
                    id="period"
                    name="period"
                    value={newFeeRecord.period}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="e.g. Jul 2023 - Dec 2023"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newFeeRecord.dueDate}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                    Payment Method (if paid)
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={newFeeRecord.paymentMethod}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Online Transfer">Online Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionId">
                    Transaction ID (if paid)
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={newFeeRecord.transactionId}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Transaction ID"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={newFeeRecord.remarks}
                    onChange={handleFeeRecordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Remarks"
                    rows="2"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newFeeRecord.studentId}
                >
                  Add Fee Record
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
                  <th className="py-3 px-6 text-left">Room</th>
                  <th className="py-3 px-6 text-left">Amount (₹)</th>
                  <th className="py-3 px-6 text-left">Period</th>
                  <th className="py-3 px-6 text-left">Due Date</th>
                  <th className="py-3 px-6 text-left">Paid Date</th>
                  <th className="py-3 px-6 text-left">Payment Method</th>
                  <th className="py-3 px-6 text-left">Transaction ID</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {feeRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{record.studentId}</td>
                    <td className="py-3 px-6 text-left">{record.name}</td>
                    <td className="py-3 px-6 text-left">{record.roomNumber}</td>
                    <td className="py-3 px-6 text-left">₹{record.amount.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{record.period}</td>
                    <td className="py-3 px-6 text-left">{record.dueDate}</td>
                    <td className="py-3 px-6 text-left">{record.paidDate || 'Not paid'}</td>
                    <td className="py-3 px-6 text-left">{record.paymentMethod || '-'}</td>
                    <td className="py-3 px-6 text-left">{record.transactionId || '-'}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${record.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {record.status === 'Pending' && (
                        <button
                          onClick={() => {
                            const transactionId = prompt('Enter Transaction ID:');
                            if (transactionId) {
                              const paymentMethod = prompt('Enter Payment Method (Online Transfer/Cheque/Cash/UPI):');
                              if (paymentMethod) {
                                handleUpdateFeeStatus(record.id, 'Paid', transactionId, paymentMethod);
                              }
                            }
                          }}
                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Mark as Paid
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
      
      {/* Complaints & Maintenance Tab */}
      {activeTab === 'complaints' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Complaints & Maintenance</h2>
          </div>
          
          {/* Add Complaint Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Report New Complaint</h3>
            <form onSubmit={handleAddComplaint}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
                    Room Number
                  </label>
                  <select
                    id="roomNumber"
                    name="roomNumber"
                    value={newComplaint.roomNumber}
                    onChange={handleComplaintChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.roomNumber}>
                        {room.roomNumber} - {room.hostelName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportedBy">
                    Reported By
                  </label>
                  <input
                    type="text"
                    id="reportedBy"
                    name="reportedBy"
                    value={newComplaint.reportedBy}
                    onChange={handleComplaintChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newComplaint.category}
                    onChange={handleComplaintChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Security">Security</option>
                    <option value="Internet">Internet</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newComplaint.description}
                    onChange={handleComplaintChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Complaint Description"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newComplaint.roomNumber}
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
          
          {/* Complaints Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Complaint Records</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Room</th>
                  <th className="py-3 px-6 text-left">Hostel</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Reported By</th>
                  <th className="py-3 px-6 text-left">Report Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Assigned To</th>
                  <th className="py-3 px-6 text-left">Resolved Date</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{complaint.roomNumber}</td>
                    <td className="py-3 px-6 text-left">{complaint.hostelName}</td>
                    <td className="py-3 px-6 text-left">{complaint.category}</td>
                    <td className="py-3 px-6 text-left">{complaint.description}</td>
                    <td className="py-3 px-6 text-left">{complaint.reportedBy}</td>
                    <td className="py-3 px-6 text-left">{complaint.reportDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                            complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{complaint.assignedTo || '-'}</td>
                    <td className="py-3 px-6 text-left">{complaint.resolvedDate || '-'}</td>
                    <td className="py-3 px-6 text-left">
                      {complaint.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              const assignedTo = prompt('Assign to:');
                              if (assignedTo) {
                                handleUpdateComplaintStatus(complaint.id, 'In Progress', assignedTo);
                              }
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Assign
                          </button>
                        </div>
                      )}
                      {complaint.status === 'In Progress' && (
                        <button
                          onClick={() => handleUpdateComplaintStatus(complaint.id, 'Resolved')}
                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Mark Resolved
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
    </div>
  );
};

export default HostelManagement;