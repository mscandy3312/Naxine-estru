const { Cliente } = require('../models');

exports.create = async (req, res) => {
  try {
    // si es cliente creando su propio perfil, usar id_usuario = req.user.id_usuario
    const payload = req.body;
    if (req.user.role === 'cliente') payload.id_usuario = req.user.id_usuario;
    const cliente = await Cliente.create(payload);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Error creando cliente', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    // admin ve todos; profesional puede ver sus clientes via sesiones (opcional)
    const where = {};
    if (req.user.role === 'cliente') where.id_usuario = req.user.id_usuario;
    const clientes = await Cliente.findAll({ where });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Error listando clientes', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    // control de acceso: cliente dueño o admin
    if (req.user.role === 'cliente' && cliente.id_usuario !== req.user.id_usuario) return res.status(403).json({ message: 'Acceso denegado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo cliente', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    if (req.user.role === 'cliente' && cliente.id_usuario !== req.user.id_usuario) return res.status(403).json({ message: 'Acceso denegado' });
    await cliente.update(req.body);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando cliente', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id_cliente);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    // solo admin puede eliminar o el propietario
    if (req.user.role !== 'admin' && cliente.id_usuario !== req.user.id_usuario) return res.status(403).json({ message: 'Acceso denegado' });
    await cliente.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando cliente', error: err.message });
  }
};
