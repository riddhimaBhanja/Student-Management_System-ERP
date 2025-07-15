const catchAsync = require('../utils/catchAsync');

exports.getFees = catchAsync(async (req, res) => {
  res.json({ message: 'Fees endpoint' });
});

exports.getTransactions = catchAsync(async (req, res) => {
  res.json({ message: 'Transactions endpoint' });
});