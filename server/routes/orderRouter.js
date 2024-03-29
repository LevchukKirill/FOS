const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getOne);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
