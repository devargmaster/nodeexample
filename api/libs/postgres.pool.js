const { Pool } = require('pg');
const { config } = require('../config/config');

try {
  const USER = encodeURIComponent(process.env.DB_USER);
  const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  const pool = new Pool({ connectionString: URI });

  module.exports = pool;
} catch (error) {
  logger.info('Error al configurar la conexión a la base de datos:', error);
  process.exit(1);
}
