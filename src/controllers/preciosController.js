const { Precio } = require('../models');

exports.create = async (req, res) => {
  try {
    // usualmente profesional crea precios -> requiere role profesional o admin
    const precio = await Precio.create(req.body);
    res.status(201).json(precio);
  } catch (err) {
    res.status(500).json({ message: 'Error creando precio', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const precios = await Precio.findAll();
    res.json(precios);
  } catch (err) {
    res.status(500).json({ message: 'Error listando precios', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const precio = await Precio.findByPk(req.params.id_precio);
    if (!precio) return res.status(404).json({ message: 'Precio no encontrado' });
    res.json(precio);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo precio', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const precio = await Precio.findByPk(req.params.id_precio);
    if (!precio) return res.status(404).json({ message: 'Precio no encontrado' });
    await precio.update(req.body);
    res.json(precio);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando precio', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const precio = await Precio.findByPk(req.params.id_precio);
    if (!precio) return res.status(404).json({ message: 'Precio no encontrado' });
    await precio.destroy();
    res.json({ message: 'Precio eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando precio', error: err.message });
  }
};
