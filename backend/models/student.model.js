const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  // Personal Information
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },

  // Academic Information
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  academicHistory: [{
    semester: Number,
    courses: [{
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
      grade: String,
      credits: Number,
    }],
    gpa: Number,
  }],
  cgpa: {
    type: Number,
    default: 0,
  },

  // Hostel Information
  hostelAllocation: {
    isAllocated: {
      type: Boolean,
      default: false,
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hostel',
    },
    roomNumber: String,
    fromDate: Date,
    toDate: Date,
  },

  // Financial Information
  fees: [{
    semester: Number,
    amount: Number,
    paid: Boolean,
    dueDate: Date,
    transactionId: String,
    paymentDate: Date,
    paymentMode: {
      type: String,
      enum: ['Online', 'Offline'],
    },
  }],
  scholarship: {
    type: {
      type: String,
      enum: ['Merit', 'Sports', 'Financial Aid', 'Other'],
    },
    amount: Number,
    duration: String,
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
    },
  },

  // Document Management
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['ID Proof', 'Address Proof', 'Academic Certificate', 'Other'],
    },
    file: {
      fileName: String,
      filePath: String,
      uploadDate: Date,
      mimeType: String,
      fileSize: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  }],

  // Library Information
  library: {
    issuedBooks: [{
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
      issueDate: Date,
      dueDate: Date,
      returnDate: Date,
      fine: {
        amount: Number,
        paid: Boolean,
        paidDate: Date,
      },
    }],
    finesPending: {
      type: Number,
      default: 0,
    },
  },

  // System Fields
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended', 'Graduated'],
    default: 'Active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Password hashing middleware
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Calculate CGPA
studentSchema.methods.calculateCGPA = function() {
  if (!this.academicHistory.length) return 0;
  
  const totalCredits = this.academicHistory.reduce((sum, semester) => {
    return sum + semester.courses.reduce((credits, course) => credits + course.credits, 0);
  }, 0);

  const weightedSum = this.academicHistory.reduce((sum, semester) => {
    return sum + semester.courses.reduce((semesterSum, course) => {
      const gradePoints = getGradePoints(course.grade);
      return semesterSum + (gradePoints * course.credits);
    }, 0);
  }, 0);

  return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
};

// Helper function to convert grades to points
function getGradePoints(grade) {
  const gradePoints = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6,
    'C': 5, 'D': 4, 'F': 0
  };
  return gradePoints[grade] || 0;
}

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
