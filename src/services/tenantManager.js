const { Sequelize, DataTypes } = require('sequelize');
const Company = require('../models/Company');

// Cache for sequelize instances
const tenantConnections = {};

const getTenantConnection = async (companyId) => {
  if (tenantConnections[companyId]) {
    return tenantConnections[companyId];
  }

  const company = await Company.findByPk(companyId);
  if (!company) {
    throw new Error(`Company with ID ${companyId} not found`);
  }

  const sequelize = new Sequelize(
    company.db_name,
    company.db_user,
    company.db_password,
    {
      host: company.db_host,
      port: company.db_port,
      dialect: 'postgres',
      logging: false,
      dialectOptions: company.db_ssl ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {},
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  // Define the Notification model for this connection
  // We do it here to ensure it's bound to the specific instance
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('YAPE', 'PLIN'),
      allowNull: false
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    verification_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    raw_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Test and Sync
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  tenantConnections[companyId] = {
    sequelize,
    models: {
      Notification
    }
  };

  return tenantConnections[companyId];
};

module.exports = { getTenantConnection };
