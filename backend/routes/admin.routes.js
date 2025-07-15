const router = require('express').Router();
const { authorizeRole } = require('../middleware/auth.middleware');

const adminController = require('../controllers/admin.controller');

router.get('/settings', authorizeRole(['admin']), adminController.getSettings);

router.get('/logs', authorizeRole(['admin']), adminController.getLogs);

module.exports = router;
