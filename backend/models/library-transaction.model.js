const mongoose = require('mongoose');

const libraryTransactionSchema = new mongoose.Schema({
  // Transaction Information
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Issue', 'Return', 'Reserve', 'Renew', 'Fine Payment'],
    required: true,
  },
  
  // User Information
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'user.type',
      required: true,
    },
    type: {
      type: String,
      enum: ['Student', 'Faculty'],
      required: true,
    },
    name: String,
    contactNumber: String,
  },

  // Book Information
  book: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    copyBarcode: {
      type: String,
      required: true,
    },
    title: String,
    isbn: String,
  },

  // Transaction Details
  dates: {
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    issueDate: Date,
    dueDate: Date,
    returnDate: Date,
    renewalDate: Date,
  },

  // Fine Details
  fine: {
    amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Not Applicable', 'Pending', 'Paid', 'Waived'],
      default: 'Not Applicable',
    },
    paymentDetails: {
      paidAmount: Number,
      paidDate: Date,
      paymentMode: {
        type: String,
        enum: ['Cash', 'Online', 'Card'],
      },
      transactionId: String,
      receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
      },
    },
    waiver: {
      amount: Number,
      reason: String,
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
      },
      approvalDate: Date,
    },
  },

  // Renewal Information
  renewal: {
    count: {
      type: Number,
      default: 0,
    },
    history: [{
      renewalDate: Date,
      previousDueDate: Date,
      newDueDate: Date,
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
      },
    }],
  },

  // Reservation Details
  reservation: {
    status: {
      type: String,
      enum: ['Active', 'Fulfilled', 'Cancelled', 'Expired'],
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    validUntil: Date,
  },

  // Status Information
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Completed', 'Cancelled', 'Overdue'],
    default: 'Pending',
  },
  remarks: String,

  // System Fields
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes for faster queries
libraryTransactionSchema.index({ 'user.id': 1, status: 1 });
libraryTransactionSchema.index({ 'book.copyBarcode': 1 });
libraryTransactionSchema.index({ transactionId: 1 });

// Methods
libraryTransactionSchema.methods.calculateFine = function() {
  if (this.type !== 'Return' || !this.dates.dueDate) return 0;

  const returnDate = this.dates.returnDate || new Date();
  const dueDate = new Date(this.dates.dueDate);

  if (returnDate <= dueDate) return 0;

  const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
  const finePerDay = 10; // Configure as needed
  return daysLate * finePerDay;
};

libraryTransactionSchema.methods.canRenew = function() {
  if (this.type !== 'Issue' || this.status !== 'Active') return false;
  if (this.renewal.count >= 2) return false; // Maximum 2 renewals allowed
  
  const hasReservation = false; // Check if book has active reservations
  return !hasReservation;
};

libraryTransactionSchema.methods.generateTransactionId = function() {
  const prefix = this.type.charAt(0);
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Pre-save middleware
libraryTransactionSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = this.generateTransactionId();
  }
  next();
});

const LibraryTransaction = mongoose.model('LibraryTransaction', libraryTransactionSchema);
module.exports = LibraryTransaction;
