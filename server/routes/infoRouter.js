const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');

router.post('/', infoController.create);
router.get('/', infoController.getAll);

module.exports = router;
