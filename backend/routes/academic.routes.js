const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const academicController = require('../controllers/academic.controller');

// Course routes
router.post('/courses', authorizeRole(['admin']), academicController.createCourse);
router.get('/courses', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllCourses);
router.put('/courses/:code', authorizeRole(['admin']), academicController.updateCourse);
router.delete('/courses/:code', authorizeRole(['admin']), academicController.deleteCourse);

// Timetable/Scheduling routes
router.post('/timetable', authorizeRole(['admin']), academicController.createTimetable);
router.get('/timetable', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllTimetables);
router.put('/timetable/:id', authorizeRole(['admin']), academicController.updateTimetable);
router.delete('/timetable/:id', authorizeRole(['admin']), academicController.deleteTimetable);

// Add alias for schedules (same as timetable)
router.post('/schedules', authorizeRole(['admin']), academicController.createTimetable);
router.get('/schedules', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllTimetables);
router.put('/schedules/:id', authorizeRole(['admin']), academicController.updateTimetable);
router.delete('/schedules/:id', authorizeRole(['admin']), academicController.deleteTimetable);

// Examination routes (both /examinations and /exams for compatibility)
router.post('/examinations', authorizeRole(['admin']), academicController.createExam);
router.get('/examinations', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllExams);
router.put('/examinations/:id', authorizeRole(['admin']), academicController.updateExam);
router.delete('/examinations/:id', authorizeRole(['admin']), academicController.deleteExam);

// Alias routes for exams
router.post('/exams', authorizeRole(['admin']), academicController.createExam);
router.get('/exams', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllExams);
router.put('/exams/:id', authorizeRole(['admin']), academicController.updateExam);
router.delete('/exams/:id', authorizeRole(['admin']), academicController.deleteExam);

// Assignments routes (new)
router.post('/assignments', authorizeRole(['admin', 'faculty']), academicController.createAssignment);
router.get('/assignments', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllAssignments);
router.put('/assignments/:id', authorizeRole(['admin', 'faculty']), academicController.updateAssignment);
router.delete('/assignments/:id', authorizeRole(['admin', 'faculty']), academicController.deleteAssignment);

// Results routes (new)
router.post('/results', authorizeRole(['admin', 'faculty']), academicController.createResult);
router.get('/results', authorizeRole(['admin', 'faculty', 'student']), academicController.getAllResults);
router.put('/results/:id', authorizeRole(['admin', 'faculty']), academicController.updateResult);
router.delete('/results/:id', authorizeRole(['admin', 'faculty']), academicController.deleteResult);

module.exports = router;
