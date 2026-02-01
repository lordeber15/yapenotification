const { Sequelize } = require('sequelize');
require('dotenv').config();

const masterSequelize = new Sequelize(
  process.env.DB_MASTER_NAME,
  process.env.DB_MASTER_USER,
  process.env.DB_MASTER_PASS,
  {
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { masterSequelize };
