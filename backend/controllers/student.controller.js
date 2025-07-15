const Student = require('../models/student.model');
const { AppError } = require('../utils/error-handler');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const studentController = {
  // Get all students
  getAllStudents: catchAsync(async (req, res) => {
    const students = await Student.find().populate('userId', '-password');
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students
      }
    });
  }),

  // Get student by ID
  getStudentById: catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id).populate('userId', '-password');
    
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    
    // Check if user has permission to view this student
    if (req.user.role !== 'admin' && req.user.role !== 'faculty' && 
        req.user._id.toString() !== student.userId.toString()) {
      return next(new AppError('Access denied', 403));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        student
      }
    });
  }),

  // Create new student
  createStudent: catchAsync(async (req, res) => {
    const student = new Student({
      ...req.body,
      studentId: await generateStudentId()
    });
    const savedStudent = await student.save();
    res.status(201).json({
      status: 'success',
      data: {
        student: savedStudent
      }
    });
  }),

  // Update student
  updateStudent: catchAsync(async (req, res, next) => {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return next(new AppError('No student found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        student: updatedStudent
      }
    });
  }),

  // Delete student
  deleteStudent: catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return next(new AppError('No student found with that ID', 404));
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  })
};

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

module.exports = studentController;