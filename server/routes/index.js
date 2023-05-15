const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const compilerRouter = require('./compilerRouter');
const reportWordRouter = require('./reportWordRouter');

router.use('/user', userRouter);
router.use('/compiler', compilerRouter);
router.use('/report', reportWordRouter);

module.exports = router;