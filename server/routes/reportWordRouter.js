const Router = require('express');
const router = new Router();
const reportWordController = require('../controllers/reportWordController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/word', authMiddleware, reportWordController.generateReport);

module.exports = router;