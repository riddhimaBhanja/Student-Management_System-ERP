const mongoose = require('mongoose');

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

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Overdue'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        enum: ['Assignment', 'Quiz', 'Midterm', 'Final', 'Project'],
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
    },
    semester: {
        type: String,
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Timetable = mongoose.model('Timetable', timetableSchema);
const Exam = mongoose.model('Exam', examSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const Result = mongoose.model('Result', resultSchema);

module.exports = { Timetable, Exam, Assignment, Result };
