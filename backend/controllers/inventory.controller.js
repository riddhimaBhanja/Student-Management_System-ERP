const catchAsync = require('../utils/catchAsync');

exports.getInventoryItems = catchAsync(async (req, res) => {
  res.json({ message: 'Inventory items endpoint' });
});

exports.getStockLevels = catchAsync(async (req, res) => {
  res.json({ message: 'Stock levels endpoint' });
});