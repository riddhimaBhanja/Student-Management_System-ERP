const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // Book Information
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  authors: [{
    type: String,
    required: true,
  }],
  edition: String,
  publisher: String,
  publicationYear: Number,
  language: String,
  pages: Number,
  
  // Classification
  category: {
    type: String,
    required: true,
    index: true,
  },
  subCategory: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  tags: [String],
  
  // Physical Details
  location: {
    shelf: String,
    row: String,
    section: String,
  },
  copies: [{
    barcode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Issued', 'Under Repair', 'Lost', 'Reserved'],
      default: 'Available',
    },
    condition: {
      type: String,
      enum: ['New', 'Good', 'Fair', 'Poor'],
      default: 'New',
    },
    purchaseDate: Date,
    price: Number,
    currentBorrower: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'copies.currentBorrower.userType',
      },
      userType: {
        type: String,
        enum: ['Student', 'Faculty'],
      },
      issueDate: Date,
      dueDate: Date,
    },
    maintenanceHistory: [{
      date: Date,
      type: String,
      description: String,
      cost: Number,
    }],
  }],

  // Digital Version
  digitalVersion: {
    available: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      enum: ['PDF', 'EPUB', 'MOBI', 'None'],
      default: 'None',
    },
    url: String,
    accessRestrictions: {
      type: String,
      enum: ['Open', 'Registered Users', 'Paid Users', 'None'],
      default: 'None',
    },
  },

  // Academic Information
  courseReferences: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    type: {
      type: String,
      enum: ['Textbook', 'Reference', 'Recommended'],
    },
  }],

  // Circulation History
  circulationHistory: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'circulationHistory.userType',
    },
    userType: {
      type: String,
      enum: ['Student', 'Faculty'],
    },
    copyBarcode: String,
    issueDate: Date,
    returnDate: Date,
    dueDate: Date,
    fine: {
      amount: Number,
      paid: {
        type: Boolean,
        default: false,
      },
      paidDate: Date,
    },
  }],

  // Statistics
  statistics: {
    totalIssues: {
      type: Number,
      default: 0,
    },
    currentIssues: {
      type: Number,
      default: 0,
    },
    lastIssueDate: Date,
    popularityScore: {
      type: Number,
      default: 0,
    },
  },

  // System Fields
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Out of Print'],
    default: 'Active',
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Indexes
bookSchema.index({ title: 'text', authors: 'text', tags: 'text' });

// Methods
bookSchema.methods.isAvailable = function() {
  return this.copies.some(copy => copy.status === 'Available');
};

bookSchema.methods.findAvailableCopy = function() {
  return this.copies.find(copy => copy.status === 'Available');
};

bookSchema.methods.calculateFine = function(copyBarcode, returnDate) {
  const copy = this.copies.find(c => c.barcode === copyBarcode);
  if (!copy || !copy.currentBorrower) return 0;

  const dueDate = new Date(copy.currentBorrower.dueDate);
  returnDate = returnDate || new Date();
  
  if (returnDate <= dueDate) return 0;

  const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
  const finePerDay = 10; // Configure as needed
  return daysLate * finePerDay;
};

bookSchema.methods.updatePopularityScore = function() {
  const NOW = new Date();
  const DAYS_30 = 30 * 24 * 60 * 60 * 1000;
  
  const recentIssues = this.circulationHistory.filter(record => 
    NOW - record.issueDate < DAYS_30
  ).length;

  this.statistics.popularityScore = (recentIssues * 0.7) + 
    (this.statistics.totalIssues * 0.3);
  
  return this.statistics.popularityScore;
};

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
