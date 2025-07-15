const { Course, Timetable, Exam } = require('../models/academic.model');
const catchAsync = require('../utils/catchAsync');

// Course Controllers
exports.createCourse = catchAsync(async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
});

exports.getAllCourses = catchAsync(async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

exports.updateCourse = catchAsync(async (req, res) => {
    const course = await Course.findOneAndUpdate(
        { code: req.params.code },
        req.body,
        { new: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
});

exports.deleteCourse = catchAsync(async (req, res) => {
    const course = await Course.findOneAndDelete({ code: req.params.code });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
});

// Timetable Controllers
exports.createTimetable = catchAsync(async (req, res) => {
    const timetableEntry = new Timetable(req.body);
    await timetableEntry.save();
    res.status(201).json(timetableEntry);
});

exports.getAllTimetables = catchAsync(async (req, res) => {
    const timetable = await Timetable.find();
    res.json(timetable);
});

exports.updateTimetable = catchAsync(async (req, res) => {
    const timetable = await Timetable.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
    res.json(timetable);
});

exports.deleteTimetable = catchAsync(async (req, res) => {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) return res.status(404).json({ message: 'Timetable entry not found' });
    res.json({ message: 'Timetable entry deleted successfully' });
});

// Examination Controllers
exports.createExam = catchAsync(async (req, res) => {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
});

exports.getAllExams = catchAsync(async (req, res) => {
    const exams = await Exam.find();
    res.json(exams);
});

exports.updateExam = catchAsync(async (req, res) => {
    const exam = await Exam.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!exam) return res.status(404).json({ message: 'Examination not found' });
    res.json(exam);
});

exports.deleteExam = catchAsync(async (req, res) => {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Examination not found' });
    res.json({ message: 'Examination deleted successfully' });
});