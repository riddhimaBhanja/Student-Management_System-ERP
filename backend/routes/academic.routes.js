const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const academicController = require('../controllers/academic.controller');

// Course routes
router.post('/courses', authorizeRole(['admin']), academicController.createCourse);

router.get('/courses', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllCourses);

// Timetable routes
router.post('/timetable', authorizeRole(['admin']), academicController.createTimetable);

router.get('/timetable', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllTimetables);

// Examination routes
router.post('/examinations', authorizeRole(['admin']), academicController.createExam);

router.get('/examinations', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllExams);

// Update routes
router.put('/courses/:code', authorizeRole(['admin']), academicController.updateCourse);

router.put('/timetable/:id', authorizeRole(['admin']), academicController.updateTimetable);

router.put('/examinations/:id', authorizeRole(['admin']), academicController.updateExam);

// Delete routes
router.delete('/courses/:code', authorizeRole(['admin']), academicController.deleteCourse);

router.delete('/timetable/:id', authorizeRole(['admin']), academicController.deleteTimetable);

router.delete('/examinations/:id', authorizeRole(['admin']), academicController.deleteExam);

module.exports = router;
