const express = require('express');
const deviceController = require('../controllers/deviceController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/registrar', authMiddleware, deviceController.registerDevice);
router.get('/', authMiddleware, deviceController.getDevices);

module.exports = router;
