import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import setupModels from '../db/index.js';

dotenv.config();

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

const models = sequelize.models;

export {models, sequelize} ;