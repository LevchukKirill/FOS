const express = require("express");
const router = express.Router();
const orderFoodController = require("../controllers/orderFoodController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", orderFoodController.create);
router.get("/", orderFoodController.getAll);
router.get("/order/:orderId", orderFoodController.getAllByOrderId);
router.put("/:id", checkRole("ADMIN"), orderFoodController.update);
router.delete("/:id", checkRole("ADMIN"), orderFoodController.delete);

module.exports = router;
