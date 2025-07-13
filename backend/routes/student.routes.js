const router = require('express').Router();
const Student = require('../models/student.model');
const { authorizeRole } = require('../middleware/auth.middleware');

// Get all students (Admin and Faculty only)
router.get('/', authorizeRole(['admin', 'faculty']), async (req, res) => {
  try {
    const students = await Student.find().populate('userId', '-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', '-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Check if user has permission to view this student
    if (req.user.role !== 'admin' && req.user.role !== 'faculty' && 
        req.user._id.toString() !== student.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new student (Admin only)
router.post('/', authorizeRole(['admin']), async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      studentId: await generateStudentId()
    });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update student (Admin only)
router.put('/:id', authorizeRole(['admin']), async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete student (Admin only)
router.delete('/:id', authorizeRole(['admin']), async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to generate student ID
async function generateStudentId() {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const latestStudent = await Student.findOne({}, {}, { sort: { 'studentId': -1 } });
  
  let nextNumber = '001';
  if (latestStudent && latestStudent.studentId) {
    const lastNumber = parseInt(latestStudent.studentId.slice(-3));
    nextNumber = (lastNumber + 1).toString().padStart(3, '0');
  }
  
  return `${currentYear}STU${nextNumber}`;
}

module.exports = router;
