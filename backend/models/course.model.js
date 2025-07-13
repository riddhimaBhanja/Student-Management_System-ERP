const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  // Course Basic Information
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  credits: {
    type: Number,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },

  // Course Structure
  syllabus: [{
    unit: Number,
    title: String,
    topics: [String],
    hours: Number,
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],

  // Teaching and Learning
  lectures: Number,
  tutorials: Number,
  practicals: Number,
  totalHours: Number,

  // Assessment Structure
  assessmentPattern: {
    internalAssessment: {
      weightage: Number,
      components: [{
        type: String,
        weightage: Number,
        minMarks: Number,
      }],
    },
    endSemester: {
      weightage: Number,
      minMarks: Number,
    },
  },

  // Course Offerings
  offerings: [{
    semester: Number,
    academicYear: String,
    faculty: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
    }],
    schedule: [{
      day: String,
      startTime: String,
      endTime: String,
      room: String,
      type: {
        type: String,
        enum: ['Lecture', 'Tutorial', 'Practical'],
      },
    }],
    enrolledStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    }],
  }],

  // Learning Resources
  textbooks: [{
    title: String,
    authors: [String],
    publisher: String,
    year: Number,
    isbn: String,
  }],
  referenceBooks: [{
    title: String,
    authors: [String],
    publisher: String,
    year: Number,
    isbn: String,
  }],
  onlineResources: [{
    title: String,
    url: String,
    description: String,
  }],

  // Course Outcomes
  courseOutcomes: [{
    number: Number,
    description: String,
    bloomsLevel: String,
  }],

  // System Fields
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Under Review'],
    default: 'Active',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
}, {
  timestamps: true,
});

// Methods to handle course operations
courseSchema.methods.isPrerequisiteSatisfied = async function(studentId) {
  const Student = mongoose.model('Student');
  const student = await Student.findById(studentId);
  
  if (!student || !this.prerequisites.length) return true;

  const completedCourses = student.academicHistory.reduce((acc, semester) => {
    semester.courses.forEach(course => {
      if (course.grade !== 'F') {
        acc.push(course.course.toString());
      }
    });
    return acc;
  }, []);

  return this.prerequisites.every(prerequisite => 
    completedCourses.includes(prerequisite.toString())
  );
};

courseSchema.methods.calculateClassAverage = async function(offeringId) {
  const offering = this.offerings.id(offeringId);
  if (!offering) return null;

  const Student = mongoose.model('Student');
  const students = await Student.find({
    '_id': { $in: offering.enrolledStudents },
    'academicHistory.courses.course': this._id
  });

  const grades = students.map(student => {
    const courseGrade = student.academicHistory
      .flatMap(semester => semester.courses)
      .find(course => course.course.toString() === this._id.toString());
    return courseGrade ? getGradePoints(courseGrade.grade) : 0;
  });

  return grades.length > 0 ? 
    (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : 0;
};

function getGradePoints(grade) {
  const gradePoints = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6,
    'C': 5, 'D': 4, 'F': 0
  };
  return gradePoints[grade] || 0;
}

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
