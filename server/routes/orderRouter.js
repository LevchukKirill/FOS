const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/user/:userId", orderController.getAllByUserId);
router.get("/:id", orderController.getOne);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
