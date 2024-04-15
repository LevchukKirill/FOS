const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const checkRole = require("../middleware/checkRoleMiddleware");

// router.post('/', checkRole('ADMIN'), foodController.create);

router.post("/", foodController.create);
router.get("/", foodController.getAll);
router.get("/type/:typeId", foodController.getByType);
router.get("/:id", foodController.getOne);
router.put("/:id", checkRole("ADMIN"), foodController.update);
router.delete("/:id", checkRole("ADMIN"), foodController.delete);

module.exports = router;
