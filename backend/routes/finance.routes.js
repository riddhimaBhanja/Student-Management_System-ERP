const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

router.get('/fees', authorizeRole(['admin', 'student']), async (req, res) => {
  try {
    res.json({ message: 'Fees endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/transactions', authorizeRole(['admin']), async (req, res) => {
  try {
    res.json({ message: 'Transactions endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
