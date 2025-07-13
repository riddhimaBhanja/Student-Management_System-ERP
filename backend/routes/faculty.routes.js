const router = require('express').Router();
const Faculty = require('../models/faculty.model');
const { authorizeRole } = require('../middleware/auth.middleware');

// Get all faculty members
router.get('/', authorizeRole(['admin']), async (req, res) => {
  try {
    const faculty = await Faculty.find().populate('userId', '-password');
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get faculty member by ID
router.get('/:id', authorizeRole(['admin', 'faculty']), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate('userId', '-password');
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }
    
    // Check if user has permission to view this faculty member
    if (req.user.role !== 'admin' && req.user._id.toString() !== faculty.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new faculty member (Admin only)
router.post('/', authorizeRole(['admin']), async (req, res) => {
  try {
    const faculty = new Faculty({
      ...req.body,
      employeeId: await generateEmployeeId()
    });
    const savedFaculty = await faculty.save();
    res.status(201).json(savedFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update faculty member
router.put('/:id', authorizeRole(['admin', 'faculty']), async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete faculty member (Admin only)
router.delete('/:id', authorizeRole(['admin']), async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

module.exports = router;
