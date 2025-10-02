const { Pago, Profesional } = require('../models');

exports.create = async (req, res) => {
  try {
    // solo admin o sistema de pagos (webhook) puede crear pagos; profesional puede ver
    const pago = await Pago.create(req.body);
    res.status(201).json(pago);
  } catch (err) {
    res.status(500).json({ message: 'Error creando pago', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const where = {};
    if (req.user.role === 'profesional') where.id_profesional = req.user.id_profesional || req.user.id_usuario;
    const pagos = await Pago.findAll({ where });
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ message: 'Error listando pagos', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id_pago);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    // control acceso
    if (req.user.role === 'profesional' && pago.id_profesional !== (req.user.id_profesional || req.user.id_usuario)) return res.status(403).json({ message: 'Acceso denegado' });
    res.json(pago);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo pago', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id_pago);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    await pago.update(req.body);
    res.json(pago);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando pago', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const pago = await Pago.findByPk(req.params.id_pago);
    if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
    await pago.destroy();
    res.json({ message: 'Pago eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando pago', error: err.message });
  }
};
