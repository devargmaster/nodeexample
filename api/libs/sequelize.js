const {Sequelize} = require('sequelize');
const {config} = require('../config/config');
const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{dialect: 'postgres',logging:true,});

module.exports = sequelize;