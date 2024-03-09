const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), infoController.create);
router.get('/', infoController.getAll);
router.put('/:id', checkRole('ADMIN'), infoController.update);
router.delete('/:id', checkRole('ADMIN'), infoController.delete);

module.exports = router;
