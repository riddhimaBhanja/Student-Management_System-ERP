const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const { Course, Timetable, Exam } = require('../models/academic.model');

// Course routes
router.post('/courses', authorizeRole(['admin']), async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/courses', authorizeRole(['admin', 'faculty', 'student']), async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Timetable routes
router.post('/timetable', authorizeRole(['admin']), async (req, res) => {
    try {
        const timetableEntry = new Timetable(req.body);
        await timetableEntry.save();
        res.status(201).json(timetableEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/timetable', authorizeRole(['admin', 'faculty', 'student']), async (req, res) => {
    try {
        const timetable = await Timetable.find();
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Examination routes
router.post('/examinations', authorizeRole(['admin']), async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/examinations', authorizeRole(['admin', 'faculty', 'student']), async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update routes
router.put('/courses/:code', authorizeRole(['admin']), async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { code: req.params.code },
            req.body,
            { new: true }
        );
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/timetable/:id', authorizeRole(['admin']), async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/examinations/:id', authorizeRole(['admin']), async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!exam) return res.status(404).json({ message: 'Examination not found' });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete routes
router.delete('/courses/:code', authorizeRole(['admin']), async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ code: req.params.code });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/timetable/:id', authorizeRole(['admin']), async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
        res.json({ message: 'Timetable entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/examinations/:id', authorizeRole(['admin']), async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Examination not found' });
        res.json({ message: 'Examination deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
