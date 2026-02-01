const { DataTypes } = require('sequelize');
const { masterSequelize } = require('../config/database');

const Device = masterSequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  company_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  device_identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Device;
