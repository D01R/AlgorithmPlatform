const Router = require('express');
const router = new Router();
const compilerController = require('../controllers/compilerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/run', authMiddleware, compilerController.sendCode);

module.exports = router;