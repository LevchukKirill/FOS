const express = require("express");
const router = express.Router();
const foodRouter = require("./foodRouter");
const orderRouter = require("./orderRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const infoRouter = require("./infoRouter");
const restaurantRouter = require("./restaurantRouter");
const orderFoodRouter = require("./orderFoodRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/order", orderRouter);
router.use("/orderfood", orderFoodRouter);
router.use("/food", foodRouter);
router.use("/restaurant", restaurantRouter);
router.use("/foodinfo", infoRouter);

module.exports = router;
