const { DataTypes } = require('sequelize');
const { masterSequelize } = require('../config/database');

const Company = masterSequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruc: {
    type: DataTypes.STRING,
    unique: true
  },
  db_host: {
    type: DataTypes.STRING,
    allowNull: false
  },
  db_port: {
    type: DataTypes.INTEGER,
    defaultValue: 5432
  },
  db_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  db_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  db_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  db_ssl: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Company;
