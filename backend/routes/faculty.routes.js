const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const facultyController = require('../controllers/faculty.controller');

// Get all faculty members
router.get('/', authorizeRole(['admin']), facultyController.getAllFaculty);

// Get faculty member by ID
router.get('/:id', authorizeRole(['admin', 'faculty']), facultyController.getFacultyById);

// Create new faculty member (Admin only)
router.post('/', authorizeRole(['admin']), facultyController.createFaculty);

// Update faculty member
router.put('/:id', authorizeRole(['admin', 'faculty']), facultyController.updateFaculty);

// Delete faculty member (Admin only)
router.delete('/:id', authorizeRole(['admin']), facultyController.deleteFaculty);

module.exports = router;
