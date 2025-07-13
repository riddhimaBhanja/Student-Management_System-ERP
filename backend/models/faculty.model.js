const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const facultySchema = new mongoose.Schema({
  // Personal Information
  employeeId: {
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

  // Professional Information
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number,
    specialization: String,
  }],
  expertise: [String],

  // Teaching Records
  coursesTeaching: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    semester: Number,
    batch: String,
    academicYear: String,
  }],

  // Leave Management
  leaveBalance: {
    casual: { type: Number, default: 12 },
    sick: { type: Number, default: 15 },
    earned: { type: Number, default: 30 },
  },
  leaveHistory: [{
    type: {
      type: String,
      enum: ['Casual', 'Sick', 'Earned'],
    },
    fromDate: Date,
    toDate: Date,
    reason: String,
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  }],

  // Research and Publications
  publications: [{
    title: String,
    journal: String,
    year: Number,
    doi: String,
    citation: String,
  }],
  research: [{
    title: String,
    fundingAgency: String,
    grantAmount: Number,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['Ongoing', 'Completed', 'Proposed'],
    },
  }],

  // Documents
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['ID Proof', 'Address Proof', 'Qualification', 'Experience', 'Other'],
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

  // System Fields
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
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
facultySchema.pre('save', async function(next) {
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
facultySchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to calculate leave balance
facultySchema.methods.calculateLeaveBalance = function() {
  const currentYear = new Date().getFullYear();
  const usedLeaves = this.leaveHistory.reduce((acc, leave) => {
    if (leave.status === 'Approved' && new Date(leave.fromDate).getFullYear() === currentYear) {
      const days = Math.ceil((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24));
      acc[leave.type.toLowerCase()] = (acc[leave.type.toLowerCase()] || 0) + days;
    }
    return acc;
  }, {});

  return {
    casual: this.leaveBalance.casual - (usedLeaves.casual || 0),
    sick: this.leaveBalance.sick - (usedLeaves.sick || 0),
    earned: this.leaveBalance.earned - (usedLeaves.earned || 0),
  };
};

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;
