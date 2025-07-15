const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const studentController = require('../controllers/student.controller');

// Get all students (Admin and Faculty only)
router.get('/', authorizeRole(['admin', 'faculty']), studentController.getAllStudents);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Create new student (Admin only)
router.post('/', authorizeRole(['admin']), studentController.createStudent);

// Update student (Admin only)
router.put('/:id', authorizeRole(['admin']), studentController.updateStudent);

// Delete student (Admin only)
router.delete('/:id', authorizeRole(['admin']), studentController.deleteStudent);

module.exports = router;
