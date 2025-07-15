const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  
  // Organizational Structure
  faculty: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  }],
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  establishedDate: Date,
  
  // Academic Information
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  programs: [{
    name: String,
    type: {
      type: String,
      enum: ['Undergraduate', 'Postgraduate', 'Doctoral', 'Certificate'],
    },
    duration: Number, // in years
    description: String,
  }],
  
  // Contact Information
  contactInfo: {
    email: String,
    phone: String,
    location: {
      building: String,
      floor: String,
      roomNumber: String,
    },
  },
  
  // System Fields
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;