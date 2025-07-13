const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  qualifications: [{
    degree: String,
    field: String,
    institution: String,
    year: Number
  }],
  contactInfo: {
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  joiningDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active'
  },
  courses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    semester: String,
    year: Number
  }],
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    timeSlots: [{
      startTime: String,
      endTime: String,
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      room: String
    }]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', facultySchema);
