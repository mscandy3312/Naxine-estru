require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos MySQL (RDS).');
    // sync({ alter: true }) o usar migraciones reales en producción
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al conectar DB:', err);
    process.exit(1);
  }
})();
