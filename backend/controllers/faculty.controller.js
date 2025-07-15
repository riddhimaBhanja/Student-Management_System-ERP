const Faculty = require('../models/faculty.model');
const catchAsync = require('../utils/catchAsync');

// Get all faculty members
exports.getAllFaculty = catchAsync(async (req, res) => {
  const faculty = await Faculty.find().populate('userId', '-password');
  res.json(faculty);
});

// Get faculty member by ID
exports.getFacultyById = catchAsync(async (req, res) => {
  const faculty = await Faculty.findById(req.params.id).populate('userId', '-password');
  if (!faculty) {
    return res.status(404).json({ message: 'Faculty member not found' });
  }
  
  // Check if user has permission to view this faculty member
  if (req.user.role !== 'admin' && req.user._id.toString() !== faculty.userId.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.json(faculty);
});

// Create new faculty member
exports.createFaculty = catchAsync(async (req, res) => {
  const faculty = new Faculty({
    ...req.body,
    employeeId: await generateEmployeeId()
  });
  const savedFaculty = await faculty.save();
  res.status(201).json(savedFaculty);
});

// Update faculty member
exports.updateFaculty = catchAsync(async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);
  if (!faculty) {
    return res.status(404).json({ message: 'Faculty member not found' });
  }

  // Only allow faculty to update their own profile unless admin
  if (req.user.role !== 'admin' && req.user._id.toString() !== faculty.userId.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const updatedFaculty = await Faculty.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedFaculty);
});

// Delete faculty member
exports.deleteFaculty = catchAsync(async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: 'Faculty member deleted successfully' });
});

// Helper function to generate employee ID
async function generateEmployeeId() {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const latestFaculty = await Faculty.findOne({}, {}, { sort: { 'employeeId': -1 } });
  
  let nextNumber = '001';
  if (latestFaculty && latestFaculty.employeeId) {
    const lastNumber = parseInt(latestFaculty.employeeId.slice(-3));
    nextNumber = (lastNumber + 1).toString().padStart(3, '0');
  }
  
  return `${currentYear}FAC${nextNumber}`;
}