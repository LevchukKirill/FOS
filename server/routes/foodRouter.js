const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/', foodController.create);
router.get('/', foodController.getAll);
router.get('/:id', foodController.getOne);

module.exports = router;
