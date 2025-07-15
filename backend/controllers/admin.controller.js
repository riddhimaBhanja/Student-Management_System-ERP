const catchAsync = require('../utils/catchAsync');

exports.getSettings = catchAsync(async (req, res) => {
  res.json({ message: 'System settings endpoint' });
});

exports.getLogs = catchAsync(async (req, res) => {
  res.json({ message: 'System logs endpoint' });
});