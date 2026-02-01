const Company = require('../models/Company');
const { getTenantConnection } = require('../services/tenantManager');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({ where: { status: true } });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    await company.update(req.body);
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.testConnection = async (req, res) => {
  try {
    const { id } = req.params;
    await getTenantConnection(id);
    res.json({ status: 'success', message: 'Connection test passed' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
