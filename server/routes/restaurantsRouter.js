const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurantsController');

router.post('/', restaurantsController.create);
router.get('/', restaurantsController.getAll);

module.exports = router;
