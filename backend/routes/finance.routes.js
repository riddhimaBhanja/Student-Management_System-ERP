const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

const financeController = require('../controllers/finance.controller');

router.get('/fees', authorizeRole(['admin', 'student']), financeController.getFees);

router.get('/transactions', authorizeRole(['admin']), financeController.getTransactions);

module.exports = router;
