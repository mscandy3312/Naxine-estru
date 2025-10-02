const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authJwt');
const { permit } = require('../middlewares/role');
const { Usuario } = require('../models');

// Obtener perfil propio
router.get('/me', authenticateJWT, async (req, res) => {
  const user = await Usuario.findByPk(req.user.id_usuario, { attributes: { exclude: ['password'] }});
  res.json(user);
});

// Ruta solo admin: listar usuarios
router.get('/', authenticateJWT, permit('admin'), async (req, res) => {
  const users = await Usuario.findAll({ attributes: { exclude: ['password'] }});
  res.json(users);
});

module.exports = router;
