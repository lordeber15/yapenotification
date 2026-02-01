const express = require('express');
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Ideally, these should be shared only with global admins, but for now we use authMiddleware
router.get('/', authMiddleware, companyController.getCompanies);
router.post('/', authMiddleware, companyController.createCompany);
router.put('/:id', authMiddleware, companyController.updateCompany);
router.post('/:id/test-connection', authMiddleware, companyController.testConnection);

module.exports = router;
