const express = require('express');
const router = express.Router();
const foodRouter = require('./foodRouter');
const orderRouter = require('./orderRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const infoRouter = require('./infoRouter');
const restaurantsRouter = require('./restaurantsRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/order', orderRouter);
router.use('/food', foodRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/foodinfo', infoRouter);

module.exports = router;
