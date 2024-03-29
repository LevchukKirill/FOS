const express = require("express");
const router = express.Router();
const orderFoodController = require("../controllers/orderFoodController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), orderFoodController.create);
router.get("/", orderFoodController.getAll);
router.put("/:id", checkRole("ADMIN"), orderFoodController.update);
router.delete("/:id", checkRole("ADMIN"), orderFoodController.delete);

module.exports = router;
