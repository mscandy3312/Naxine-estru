const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findByPk(payload.id_usuario);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authenticateJWT;
