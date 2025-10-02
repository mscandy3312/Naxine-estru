const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

// registro local (email/password)
exports.register = async (req, res) => {
  const { email, password, nombre, role } = req.body;
  try {
    const exists = await Usuario.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });
    const user = await Usuario.create({ email, password, nombre, role: role || 'user' });
    return res.status(201).json({ message: 'Usuario creado', user: { id_usuario: user.id_usuario, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor', error: err.message });
  }
};

// login local -> devuelve JWT
exports.login = async (req, res) => {
  // passport local ya autenticó y colocó req.user
  const user = req.user;
  const payload = { id_usuario: user.id_usuario, role: user.role, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token, user: payload });
};

// callback OAuth después de passport Google
exports.oauthCallback = (req, res) => {
  // aquí passport nos puso req.user
  const user = req.user;
  const payload = { id_usuario: user.id_usuario, role: user.role, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  // Puedes redirigir con token, o devolver JSON. Ejemplo: redirigir con token en query
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/oauth-success?token=${token}`);
};
