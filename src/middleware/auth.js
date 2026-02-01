const jwt = require('jsonwebtoken');
const { getTenantConnection } = require('../services/tenantManager');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // If the user has a company_id, we automatically set up the tenant connection
    if (req.user.company_id) {
      const tenant = await getTenantConnection(req.user.company_id);
      req.tenant = tenant;
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
