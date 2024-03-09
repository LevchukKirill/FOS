const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), restaurantsController.create);
router.get('/', restaurantsController.getAll);
router.put('/:id', checkRole('ADMIN'), restaurantsController.update);
router.delete('/:id', checkRole('ADMIN'), restaurantsController.delete);

module.exports = router;
