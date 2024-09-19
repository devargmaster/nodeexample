const { Sequelize } = require('sequelize');

const { config } = require('../config/config.cjs');
const setupModels = require('./../db/models/index.cjs');

const isProduction = process.env.NODE_ENV === 'production';
const URI = isProduction ? process.env.DATABASE_URL : `postgres://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
});


setupModels(sequelize);

module.exports = sequelize;