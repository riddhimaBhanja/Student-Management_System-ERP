import React, { useState } from 'react';

const InventoryManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('equipment');
  
  // State for equipment inventory
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Dell Latitude Laptop', category: 'Computer', location: 'Computer Lab 1', status: 'In Use', condition: 'Good', lastMaintenance: '2023-06-15', nextMaintenance: '2023-12-15', assignedTo: 'CSE Department' },
    { id: 2, name: 'HP LaserJet Printer', category: 'Printer', location: 'Admin Office', status: 'In Use', condition: 'Fair', lastMaintenance: '2023-05-10', nextMaintenance: '2023-11-10', assignedTo: 'Admin Staff' },
    { id: 3, name: 'Projector Epson EB-X41', category: 'Projector', location: 'Lecture Hall 2', status: 'In Use', condition: 'Good', lastMaintenance: '2023-07-20', nextMaintenance: '2024-01-20', assignedTo: 'Physics Department' },
    { id: 4, name: 'Oscilloscope', category: 'Lab Equipment', location: 'Physics Lab', status: 'Under Maintenance', condition: 'Needs Repair', lastMaintenance: '2023-01-05', nextMaintenance: '2023-09-05', assignedTo: 'Physics Department' },
  ]);
  
  // State for maintenance records
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, equipmentId: 4, equipmentName: 'Oscilloscope', maintenanceType: 'Repair', description: 'Calibration issue', scheduledDate: '2023-09-05', completedDate: '', status: 'Scheduled', technician: 'John Smith', cost: 2500 },
    { id: 2, equipmentId: 2, equipmentName: 'HP LaserJet Printer', maintenanceType: 'Regular', description: 'Routine check and cleaning', scheduledDate: '2023-11-10', completedDate: '', status: 'Scheduled', technician: 'Tech Support Team', cost: 500 },
    { id: 3, equipmentId: 1, equipmentName: 'Dell Latitude Laptop', maintenanceType: 'Software Update', description: 'OS and software updates', scheduledDate: '2023-06-15', completedDate: '2023-06-15', status: 'Completed', technician: 'IT Department', cost: 0 },
  ]);
  
  // State for purchase requests
  const [purchaseRequests, setPurchaseRequests] = useState([
    { id: 1, itemName: 'Scientific Calculator', category: 'Classroom Equipment', quantity: 30, estimatedCost: 15000, requestDate: '2023-08-01', requestedBy: 'Mathematics Department', status: 'Pending Approval', priority: 'Medium', justification: 'Required for mathematics classes' },
    { id: 2, itemName: 'Chemistry Lab Glassware Set', category: 'Lab Equipment', quantity: 10, estimatedCost: 25000, requestDate: '2023-07-25', requestedBy: 'Chemistry Department', status: 'Approved', priority: 'High', justification: 'Replacement for broken equipment' },
    { id: 3, itemName: 'Wireless Microphone System', category: 'Audio Equipment', quantity: 2, estimatedCost: 12000, requestDate: '2023-08-05', requestedBy: 'Event Management Team', status: 'Rejected', priority: 'Low', justification: 'For college events and functions' },
  ]);
  
  // State for new equipment form
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    category: '',
    location: '',
    status: 'Available',
    condition: 'Good',
    lastMaintenance: new Date().toISOString().split('T')[0],
    nextMaintenance: '',
    assignedTo: '',
  });
  
  // State for new maintenance record form
  const [newMaintenance, setNewMaintenance] = useState({
    equipmentId: '',
    equipmentName: '',
    maintenanceType: '',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    technician: '',
    cost: '',
  });
  
  // State for new purchase request form
  const [newPurchaseRequest, setNewPurchaseRequest] = useState({
    itemName: '',
    category: '',
    quantity: '',
    estimatedCost: '',
    requestedBy: '',
    priority: 'Medium',
    justification: '',
  });
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle equipment form change
  const handleEquipmentChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({
      ...newEquipment,
      [name]: value,
    });
  };
  
  // Handle maintenance form change
  const handleMaintenanceChange = (e) => {
    const { name, value } = e.target;
    setNewMaintenance({
      ...newMaintenance,
      [name]: value,
    });
    
    // If equipment ID is selected, auto-fill equipment name
    if (name === 'equipmentId') {
      const selectedEquipment = equipment.find(item => item.id === parseInt(value));
      if (selectedEquipment) {
        setNewMaintenance({
          ...newMaintenance,
          equipmentId: value,
          equipmentName: selectedEquipment.name,
        });
      }
    }
  };
  
  // Handle purchase request form change
  const handlePurchaseRequestChange = (e) => {
    const { name, value } = e.target;
    setNewPurchaseRequest({
      ...newPurchaseRequest,
      [name]: value,
    });
  };
  
  // Add new equipment
  const handleAddEquipment = (e) => {
    e.preventDefault();
    const newEquipmentEntry = {
      id: equipment.length + 1,
      ...newEquipment,
    };
    setEquipment([...equipment, newEquipmentEntry]);
    setNewEquipment({
      name: '',
      category: '',
      location: '',
      status: 'Available',
      condition: 'Good',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: '',
      assignedTo: '',
    });
  };
  
  // Add new maintenance record
  const handleAddMaintenance = (e) => {
    e.preventDefault();
    const newMaintenanceRecord = {
      id: maintenanceRecords.length + 1,
      ...newMaintenance,
      equipmentId: parseInt(newMaintenance.equipmentId),
      completedDate: '',
      status: 'Scheduled',
      cost: parseFloat(newMaintenance.cost) || 0,
    };
    setMaintenanceRecords([...maintenanceRecords, newMaintenanceRecord]);
    
    // Update equipment's next maintenance date
    const updatedEquipment = equipment.map(item => {
      if (item.id === parseInt(newMaintenance.equipmentId)) {
        return {
          ...item,
          nextMaintenance: newMaintenance.scheduledDate,
          status: newMaintenance.maintenanceType === 'Repair' ? 'Under Maintenance' : item.status,
        };
      }
      return item;
    });
    
    setEquipment(updatedEquipment);
    setNewMaintenance({
      equipmentId: '',
      equipmentName: '',
      maintenanceType: '',
      description: '',
      scheduledDate: new Date().toISOString().split('T')[0],
      technician: '',
      cost: '',
    });
  };
  
  // Add new purchase request
  const handleAddPurchaseRequest = (e) => {
    e.preventDefault();
    const newRequest = {
      id: purchaseRequests.length + 1,
      ...newPurchaseRequest,
      quantity: parseInt(newPurchaseRequest.quantity),
      estimatedCost: parseFloat(newPurchaseRequest.estimatedCost),
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending Approval',
    };
    setPurchaseRequests([...purchaseRequests, newRequest]);
    setNewPurchaseRequest({
      itemName: '',
      category: '',
      quantity: '',
      estimatedCost: '',
      requestedBy: '',
      priority: 'Medium',
      justification: '',
    });
  };
  
  // Complete maintenance
  const handleCompleteMaintenance = (id) => {
    // Update maintenance record
    const updatedRecords = maintenanceRecords.map(record => {
      if (record.id === id) {
        return {
          ...record,
          completedDate: new Date().toISOString().split('T')[0],
          status: 'Completed',
        };
      }
      return record;
    });
    
    // Find the completed record to update equipment
    const completedRecord = updatedRecords.find(record => record.id === id);
    
    // Update equipment status
    if (completedRecord) {
      const updatedEquipment = equipment.map(item => {
        if (item.id === completedRecord.equipmentId) {
          return {
            ...item,
            status: 'In Use',
            lastMaintenance: new Date().toISOString().split('T')[0],
            condition: 'Good',
          };
        }
        return item;
      });
      
      setEquipment(updatedEquipment);
    }
    
    setMaintenanceRecords(updatedRecords);
  };
  
  // Update purchase request status
  const handleUpdatePurchaseStatus = (id, status) => {
    const updatedRequests = purchaseRequests.map(request => 
      request.id === id ? { ...request, status } : request
    );
    setPurchaseRequests(updatedRequests);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'equipment' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('equipment')}
        >
          Equipment Inventory
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'maintenance' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('maintenance')}
        >
          Maintenance
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'purchase' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => handleTabChange('purchase')}
        >
          Purchase Requests
        </button>
      </div>
      
      {/* Equipment Inventory Tab */}
      {activeTab === 'equipment' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Equipment Inventory</h2>
          </div>
          
          {/* Add Equipment Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Equipment</h3>
            <form onSubmit={handleAddEquipment}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Equipment Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newEquipment.name}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Equipment Name"
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
                    value={newEquipment.category}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Computer">Computer</option>
                    <option value="Printer">Printer</option>
                    <option value="Projector">Projector</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Audio Equipment">Audio Equipment</option>
                    <option value="Network Equipment">Network Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newEquipment.location}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={newEquipment.status}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Out of Order">Out of Order</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={newEquipment.condition}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Needs Repair">Needs Repair</option>
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
                    value={newEquipment.lastMaintenance}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nextMaintenance">
                    Next Maintenance Date
                  </label>
                  <input
                    type="date"
                    id="nextMaintenance"
                    name="nextMaintenance"
                    value={newEquipment.nextMaintenance}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    id="assignedTo"
                    name="assignedTo"
                    value={newEquipment.assignedTo}
                    onChange={handleEquipmentChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Department/Person"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
          
          {/* Equipment Inventory Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Equipment List</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Location</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Condition</th>
                  <th className="py-3 px-6 text-left">Last Maintenance</th>
                  <th className="py-3 px-6 text-left">Next Maintenance</th>
                  <th className="py-3 px-6 text-left">Assigned To</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {equipment.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{item.name}</td>
                    <td className="py-3 px-6 text-left">{item.category}</td>
                    <td className="py-3 px-6 text-left">{item.location}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 
                            item.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 
                            item.status === 'Under Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${item.condition === 'Excellent' || item.condition === 'Good' ? 'bg-green-100 text-green-800' : 
                            item.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {item.condition}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{item.lastMaintenance || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{item.nextMaintenance || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{item.assignedTo || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Maintenance Tab */}
      {activeTab === 'maintenance' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Maintenance Management</h2>
          </div>
          
          {/* Schedule Maintenance Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Schedule Maintenance</h3>
            <form onSubmit={handleAddMaintenance}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipmentId">
                    Equipment
                  </label>
                  <select
                    id="equipmentId"
                    name="equipmentId"
                    value={newMaintenance.equipmentId}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Equipment</option>
                    {equipment.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maintenanceType">
                    Maintenance Type
                  </label>
                  <select
                    id="maintenanceType"
                    name="maintenanceType"
                    value={newMaintenance.maintenanceType}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Regular">Regular Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Software Update">Software Update</option>
                    <option value="Hardware Upgrade">Hardware Upgrade</option>
                    <option value="Calibration">Calibration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduledDate">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={newMaintenance.scheduledDate}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technician">
                    Technician/Service Provider
                  </label>
                  <input
                    type="text"
                    id="technician"
                    name="technician"
                    value={newMaintenance.technician}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Technician Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
                    Estimated Cost (₹)
                  </label>
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    value={newMaintenance.cost}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Estimated Cost"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newMaintenance.description}
                    onChange={handleMaintenanceChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Maintenance Description"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={!newMaintenance.equipmentId}
                >
                  Schedule Maintenance
                </button>
              </div>
            </form>
          </div>
          
          {/* Maintenance Records Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Maintenance Records</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Equipment</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Scheduled Date</th>
                  <th className="py-3 px-6 text-left">Completed Date</th>
                  <th className="py-3 px-6 text-left">Technician</th>
                  <th className="py-3 px-6 text-left">Cost (₹)</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {maintenanceRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{record.equipmentName}</td>
                    <td className="py-3 px-6 text-left">{record.maintenanceType}</td>
                    <td className="py-3 px-6 text-left">{record.description}</td>
                    <td className="py-3 px-6 text-left">{record.scheduledDate}</td>
                    <td className="py-3 px-6 text-left">{record.completedDate || 'Not completed'}</td>
                    <td className="py-3 px-6 text-left">{record.technician}</td>
                    <td className="py-3 px-6 text-left">₹{record.cost.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {record.status === 'Scheduled' && (
                        <button
                          onClick={() => handleCompleteMaintenance(record.id)}
                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                        >
                          Mark Complete
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
      
      {/* Purchase Requests Tab */}
      {activeTab === 'purchase' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Purchase Requests</h2>
          </div>
          
          {/* Purchase Request Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">New Purchase Request</h3>
            <form onSubmit={handleAddPurchaseRequest}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={newPurchaseRequest.itemName}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Item Name"
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
                    value={newPurchaseRequest.category}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Computer">Computer</option>
                    <option value="Printer">Printer</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Classroom Equipment">Classroom Equipment</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Audio Equipment">Audio Equipment</option>
                    <option value="Network Equipment">Network Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={newPurchaseRequest.quantity}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Quantity"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedCost">
                    Estimated Cost (₹)
                  </label>
                  <input
                    type="number"
                    id="estimatedCost"
                    name="estimatedCost"
                    value={newPurchaseRequest.estimatedCost}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Estimated Cost"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestedBy">
                    Requested By
                  </label>
                  <input
                    type="text"
                    id="requestedBy"
                    name="requestedBy"
                    value={newPurchaseRequest.requestedBy}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Department/Person"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newPurchaseRequest.priority}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="justification">
                    Justification
                  </label>
                  <textarea
                    id="justification"
                    name="justification"
                    value={newPurchaseRequest.justification}
                    onChange={handlePurchaseRequestChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Justification for Purchase"
                    rows="3"
                    required
                  ></textarea>
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
          
          {/* Purchase Requests Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Purchase Request List</h3>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Item</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Est. Cost (₹)</th>
                  <th className="py-3 px-6 text-left">Requested By</th>
                  <th className="py-3 px-6 text-left">Request Date</th>
                  <th className="py-3 px-6 text-left">Priority</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {purchaseRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{request.itemName}</td>
                    <td className="py-3 px-6 text-left">{request.category}</td>
                    <td className="py-3 px-6 text-left">{request.quantity}</td>
                    <td className="py-3 px-6 text-left">₹{request.estimatedCost.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{request.requestedBy}</td>
                    <td className="py-3 px-6 text-left">{request.requestDate}</td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${request.priority === 'Low' ? 'bg-blue-100 text-blue-800' : 
                            request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            request.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs 
                          ${request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {request.status === 'Pending Approval' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUpdatePurchaseStatus(request.id, 'Approved')}
                            className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-2 rounded"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdatePurchaseStatus(request.id, 'Rejected')}
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

export default InventoryManagement;