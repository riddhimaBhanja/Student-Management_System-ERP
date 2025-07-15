const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Create new user
  const user = new User({
    name,
    email,
    password,
    role
  });

  // Save user
  const savedUser = await user.save();

  // Create token
  const token = jwt.sign(
    { _id: savedUser._id, role: savedUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    token,
    user: {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role
    }
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isMatch = await user.isValidPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});