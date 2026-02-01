const express = require('express');
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, notificationController.syncNotifications);
router.get('/', authMiddleware, notificationController.getNotifications);

module.exports = router;
