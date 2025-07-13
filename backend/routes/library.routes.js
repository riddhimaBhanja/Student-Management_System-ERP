const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

router.get('/books', authorizeRole(['admin', 'faculty', 'student', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Books endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/borrowings', authorizeRole(['admin', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Borrowings endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
