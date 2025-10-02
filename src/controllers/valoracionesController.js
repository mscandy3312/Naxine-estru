const { Valoracion, Sesion } = require('../models');

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    // solo cliente dueño de la sesión puede crear valoración (regla ejemplo)
    const sesion = await Sesion.findByPk(payload.id_sesion);
    if (!sesion) return res.status(404).json({ message: 'Sesión no encontrada' });
    if (req.user.role === 'cliente' && sesion.id_cliente !== req.user.id_usuario) return res.status(403).json({ message: 'Solo el cliente que agenda puede valorar' });
    const valoracion = await Valoracion.create(payload);
    res.status(201).json(valoracion);
  } catch (err) {
    res.status(500).json({ message: 'Error creando valoración', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const valoraciones = await Valoracion.findAll();
    res.json(valoraciones);
  } catch (err) {
    res.status(500).json({ message: 'Error listando valoraciones', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const valoracion = await Valoracion.findByPk(req.params.id_valoracion);
    if (!valoracion) return res.status(404).json({ message: 'Valoración no encontrada' });
    res.json(valoracion);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo valoración', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const valoracion = await Valoracion.findByPk(req.params.id_valoracion);
    if (!valoracion) return res.status(404).json({ message: 'Valoración no encontrada' });
    // controlar permisos: cliente autor o admin
    await valoracion.update(req.body);
    res.json(valoracion);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando valoración', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const valoracion = await Valoracion.findByPk(req.params.id_valoracion);
    if (!valoracion) return res.status(404).json({ message: 'Valoración no encontrada' });
    await valoracion.destroy();
    res.json({ message: 'Valoración eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando valoración', error: err.message });
  }
};
