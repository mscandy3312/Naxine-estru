const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: console.log, // para ver queries en consola
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conectado a MySQL RDS correctamente'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;
