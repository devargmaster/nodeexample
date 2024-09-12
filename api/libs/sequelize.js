const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const  setupModels  = require('../db/models');
const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,
    {
        dialect: 'postgres',
        logging: console.log,
    });

setupModels(sequelize);

sequelize.sync();
module.exports = sequelize;