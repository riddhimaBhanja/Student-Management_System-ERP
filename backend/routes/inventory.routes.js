const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

router.get('/items', authorizeRole(['admin', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Inventory items endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stock', authorizeRole(['admin', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Stock levels endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
