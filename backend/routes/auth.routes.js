const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);


// Get current user
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
