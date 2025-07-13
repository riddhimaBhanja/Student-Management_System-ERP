const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

router.get('/rooms', authorizeRole(['admin', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Hostel rooms endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/allocations', authorizeRole(['admin', 'staff']), async (req, res) => {
  try {
    res.json({ message: 'Room allocations endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
