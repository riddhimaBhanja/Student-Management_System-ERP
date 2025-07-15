const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const departmentController = require('../controllers/department.controller');

// Get all departments
router.get('/', 
    authorizeRole(['admin', 'faculty', 'student']), 
    departmentController.getAllDepartments
);

// Get department by ID
router.get('/:id',
    authorizeRole(['admin', 'faculty', 'student']),
    departmentController.getDepartmentById
);

// Create a new department (Admin only)
router.post('/',
    authorizeRole(['admin']),
    departmentController.createDepartment
);

// Update a department (Admin only)
router.put('/:id',
    authorizeRole(['admin']),
    departmentController.updateDepartment
);

// Delete a department (Admin only)
router.delete('/:id',
    authorizeRole(['admin']),
    departmentController.deleteDepartment
);

module.exports = router;