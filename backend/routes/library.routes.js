const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');
const libraryController = require('../controllers/library.controller');

// Book Management Routes
router.post('/books', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.addBook
);

router.put('/books/:id', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.updateBook
);

router.delete('/books/:id', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.deleteBook
);

router.get('/books/search', 
  authorizeRole(['admin', 'librarian', 'faculty', 'student']), 
  libraryController.searchBooks
);

router.get('/books', 
  authorizeRole(['admin', 'librarian', 'faculty', 'student']), 
  libraryController.searchBooks
);

// Circulation Routes
router.post('/issue', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.issueBook
);

router.post('/return/:transactionId', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.returnBook
);

router.post('/renew/:transactionId', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.renewBook
);

// Fine Management Routes
router.post('/fines/:transactionId/pay', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.payFine
);

// Report Routes
router.get('/reports', 
  authorizeRole(['admin', 'librarian']), 
  libraryController.generateReport
);

// Student/Faculty Routes
router.get('/my-books', 
  authorizeRole(['student', 'faculty']), 
  async (req, res) => {
    try {
      const transactions = await LibraryTransaction.find({
        'user.id': req.user._id,
        'user.type': req.user.role,
        status: 'Active'
      }).populate('book.id');
      res.json({ success: true, data: transactions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.get('/my-fines', 
  authorizeRole(['student', 'faculty']), 
  async (req, res) => {
    try {
      const transactions = await LibraryTransaction.find({
        'user.id': req.user._id,
        'user.type': req.user.role,
        'fine.status': 'Pending'
      });
      const totalFine = transactions.reduce((sum, t) => sum + t.fine.amount, 0);
      res.json({ 
        success: true, 
        data: { transactions, totalFine } 
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
