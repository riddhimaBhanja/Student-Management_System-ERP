const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

const timetableSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    }
});

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);
const Timetable = mongoose.model('Timetable', timetableSchema);
const Exam = mongoose.model('Exam', examSchema);

module.exports = { Course, Timetable, Exam };
