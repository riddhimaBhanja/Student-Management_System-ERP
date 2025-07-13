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
