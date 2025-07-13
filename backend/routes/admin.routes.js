const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

router.get('/settings', authorizeRole(['admin']), async (req, res) => {
  try {
    res.json({ message: 'System settings endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/logs', authorizeRole(['admin']), async (req, res) => {
  try {
    res.json({ message: 'System logs endpoint' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
