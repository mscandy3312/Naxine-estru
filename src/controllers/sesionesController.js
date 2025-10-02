const { Sesion, Profesional, Cliente, Precio, Valoracion } = require('../models');

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    // si quien crea es cliente, forzamos id_cliente
    if (req.user.role === 'cliente') payload.id_cliente = req.user.id_usuario ? undefined : payload.id_cliente;
    const sesion = await Sesion.create(payload);
    res.status(201).json(sesion);
  } catch (err) {
    res.status(500).json({ message: 'Error creando sesión', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    // admin -> todas; profesional -> sus sesiones; cliente -> sus sesiones
    const where = {};
    if (req.user.role === 'profesional') where.id_profesional = req.user.id_profesional || req.user.id_usuario;
    if (req.user.role === 'cliente') where.id_cliente = req.user.id_cliente || req.user.id_usuario;
    const sesiones = await Sesion.findAll({ where, include: [{ model: Valoracion, as: 'valoracion' }]});
    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ message: 'Error listando sesiones', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id_sesion, { include: ['profesional','cliente','precio','valoracion'] });
    if (!sesion) return res.status(404).json({ message: 'Sesión no encontrada' });
    // control acceso
    if (req.user.role === 'profesional' && sesion.id_profesional !== req.user.id_usuario) return res.status(403).json({ message: 'Acceso denegado' });
    if (req.user.role === 'cliente' && sesion.id_cliente !== req.user.id_usuario) return res.status(403).json({ message: 'Acceso denegado' });
    res.json(sesion);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo sesión', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id_sesion);
    if (!sesion) return res.status(404).json({ message: 'Sesión no encontrada' });
    // quien puede actualizar dependerá del campo (ej. profesional puede cambiar estado)
    await sesion.update(req.body);
    res.json(sesion);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando sesión', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const sesion = await Sesion.findByPk(req.params.id_sesion);
    if (!sesion) return res.status(404).json({ message: 'Sesión no encontrada' });
    await sesion.destroy();
    res.json({ message: 'Sesión eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando sesión', error: err.message });
  }
};
