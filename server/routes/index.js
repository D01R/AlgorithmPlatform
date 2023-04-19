const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const compilerRouter = require('./compilerRouter');

router.use('/user', userRouter);
router.use('/compiler', compilerRouter);

module.exports = router;