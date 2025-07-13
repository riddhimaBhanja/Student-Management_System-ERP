const Book = require('../models/book.model');
const LibraryTransaction = require('../models/library-transaction.model');
const { AppError } = require('../utils/error-handler');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const libraryController = {
  // Book Management
  addBook: catchAsync(async (req, res) => {
    const book = new Book(req.body);
    book.addedBy = req.user._id;
    await book.save();
    res.status(201).json({
      status: 'success',
      data: {
        book
      }
    });
  }),

  updateBook: catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        book
      }
    });
  }),

  deleteBook: catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }
    
    // Check if any copies are currently issued
    const issuedCopies = book.copies.filter(copy => copy.status === 'Issued');
    if (issuedCopies.length > 0) {
      return next(new AppError('Cannot delete book with issued copies', 400));
    }
    
    await book.remove();
    res.status(204).json({
      status: 'success',
      data: null
    });
  }),

  searchBooks: catchAsync(async (req, res) => {
    const { query, category, department, availability } = req.query;
    const searchQuery = {};

    if (query) {
      searchQuery.$text = { $search: query };
    }
    if (category) searchQuery.category = category;
    if (department) searchQuery.department = department;
    if (availability === 'available') {
      searchQuery['copies.status'] = 'Available';
    }

    const books = await Book.find(searchQuery);
    
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books
      }
    });
  }),

  // Transaction Management
  issueBook: catchAsync(async (req, res, next) => {
    const { userId, bookId, copyBarcode } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return next(new AppError('No book found with that ID', 404));
    }

    const copy = book.copies.find(c => c.barcode === copyBarcode);
    if (!copy) {
      return next(new AppError('Invalid copy barcode', 400));
    }

    if (copy.status === 'Issued') {
      return next(new AppError('This copy is already issued', 400));
    }

    const transaction = new LibraryTransaction({
      user: userId,
      book: {
        id: bookId,
        title: book.title,
        copyBarcode,
      },
      type: 'Issue'
    });

    copy.status = 'Issued';
    await book.save();
    await transaction.save();

    res.status(201).json({
      status: 'success',
      data: {
        transaction
      }
    });
  }),

  returnBook: catchAsync(async (req, res, next) => {
    const { transactionId } = req.params;

    const transaction = await LibraryTransaction.findById(transactionId);
    if (!transaction) {
      return next(new AppError('No transaction found with that ID', 404));
    }

    if (transaction.status === 'Returned') {
      return next(new AppError('Book is already returned', 400));
    }

    const book = await Book.findById(transaction.book.id);
    if (!book) {
      return next(new AppError('Associated book not found', 404));
    }

    const copy = book.copies.find(c => c.barcode === transaction.book.copyBarcode);
    if (!copy) {
      return next(new AppError('Book copy not found', 404));
    }

    // Calculate fine if returned late
    const dueDate = new Date(transaction.dueDate);
    const today = new Date();
    let fine = 0;

    if (today > dueDate) {
      const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 10; // ₹10 per day
    }

    // Update transaction
    transaction.returnDate = today;
    transaction.fine = fine;
    transaction.status = 'Returned';
    await transaction.save();

    // Update book copy status
    copy.status = 'Available';
    await book.save();

    res.status(200).json({
      status: 'success',
      data: {
        transaction
      }
    });
  }),

  // Add the missing functions
  renewBook: catchAsync(async (req, res, next) => {
    const { transactionId } = req.params;

    const transaction = await LibraryTransaction.findById(transactionId);
    if (!transaction) {
      return next(new AppError('No transaction found with that ID', 404));
    }

    if (transaction.status !== 'Active') {
      return next(new AppError('Only active transactions can be renewed', 400));
    }

    // Check if already renewed maximum times (e.g., max 2 renewals)
    if (transaction.renewalCount >= 2) {
      return next(new AppError('Maximum renewal limit reached', 400));
    }

    // Calculate new due date (typically 14 days from now)
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + 14);

    // Update transaction
    transaction.previousDueDate = transaction.dueDate;
    transaction.dueDate = newDueDate;
    transaction.renewalCount = (transaction.renewalCount || 0) + 1;
    transaction.renewedAt = new Date();
    transaction.renewedBy = req.user._id;

    await transaction.save();

    res.status(200).json({
      status: 'success',
      data: {
        transaction
      }
    });
  }),

  payFine: catchAsync(async (req, res, next) => {
    const { transactionId } = req.params;
    const { paymentMethod, receiptNumber } = req.body;

    const transaction = await LibraryTransaction.findById(transactionId);
    if (!transaction) {
      return next(new AppError('No transaction found with that ID', 404));
    }

    if (!transaction.fine || transaction.fine <= 0) {
      return next(new AppError('No fine to pay for this transaction', 400));
    }

    if (transaction.fineStatus === 'Paid') {
      return next(new AppError('Fine already paid', 400));
    }

    // Update transaction with payment details
    transaction.fineStatus = 'Paid';
    transaction.finePayment = {
      amount: transaction.fine,
      method: paymentMethod || 'Cash',
      receiptNumber: receiptNumber || '',
      paidAt: new Date(),
      collectedBy: req.user._id
    };

    await transaction.save();

    res.status(200).json({
      status: 'success',
      data: {
        transaction
      }
    });
  }),

  generateReport: catchAsync(async (req, res) => {
    const { reportType, startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const end = endDate ? new Date(endDate) : new Date();
    
    let report = {};
    
    switch(reportType) {
      case 'circulation':
        // Books issued and returned in the period
        const transactions = await LibraryTransaction.find({
          createdAt: { $gte: start, $lte: end }
        }).sort('-createdAt');
        
        const issuedCount = transactions.filter(t => t.type === 'Issue').length;
        const returnedCount = transactions.filter(t => t.status === 'Returned').length;
        const overdueCount = transactions.filter(t => 
          t.status === 'Active' && new Date(t.dueDate) < new Date()
        ).length;
        
        report = {
          period: { start, end },
          issuedCount,
          returnedCount,
          overdueCount,
          transactions
        };
        break;
        
      case 'fines':
        // Fine collection report
        const fineTransactions = await LibraryTransaction.find({
          'finePayment.paidAt': { $gte: start, $lte: end },
          fineStatus: 'Paid'
        });
        
        const totalCollected = fineTransactions.reduce(
          (sum, t) => sum + (t.finePayment?.amount || 0), 0
        );
        
        report = {
          period: { start, end },
          totalCollected,
          transactionCount: fineTransactions.length,
          transactions: fineTransactions
        };
        break;
        
      case 'inventory':
        // Book inventory status
        const books = await Book.find();
        const totalBooks = books.length;
        const totalCopies = books.reduce(
          (sum, book) => sum + book.copies.length, 0
        );
        const availableCopies = books.reduce(
          (sum, book) => sum + book.copies.filter(c => c.status === 'Available').length, 0
        );
        
        report = {
          totalBooks,
          totalCopies,
          availableCopies,
          issuedCopies: totalCopies - availableCopies
        };
        break;
        
      default:
        report = { message: 'Invalid report type' };
    }
    
    res.status(200).json({
      status: 'success',
      data: report
    });
  }),

  getTransactionHistory: catchAsync(async (req, res) => {
    const { startDate, endDate, type } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (type) query.type = type;

    const transactions = await LibraryTransaction.find(query)
      .populate('user', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: {
        transactions
      }
    });
  })
};

module.exports = libraryController;
