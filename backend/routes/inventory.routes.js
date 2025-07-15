const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

const inventoryController = require('../controllers/inventory.controller');

router.get('/items', authorizeRole(['admin', 'staff']), inventoryController.getInventoryItems);

router.get('/stock', authorizeRole(['admin', 'staff']), inventoryController.getStockLevels);

module.exports = router;
