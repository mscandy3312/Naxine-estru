const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
  }
});
