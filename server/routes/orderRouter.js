const express = require('express');
const router = express.Router();
const orderController = require('../controllers/typeController');

router.post('/', orderController.create);
router.get('/', orderController.getAll);

// router.put('/:id', orderController.update);
// router.delete('/:id', orderController.delete);

module.exports = router;
