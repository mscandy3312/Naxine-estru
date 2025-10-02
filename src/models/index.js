const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Profesional = require('./profesional');
const Cliente = require('./cliente');
const Precio = require('./precio');
const Sesion = require('./sesion');
const Valoracion = require('./valoracion');
const Pago = require('./pago');

const models = {
  Usuario: Usuario.initModel(sequelize),
  Profesional: Profesional.initModel(sequelize),
  Cliente: Cliente.initModel(sequelize),
  Precio: Precio.initModel(sequelize),
  Sesion: Sesion.initModel(sequelize),
  Valoracion: Valoracion.initModel(sequelize),
  Pago: Pago.initModel(sequelize),
};

// Relaciones
models.Usuario.hasMany(models.Profesional, { foreignKey: 'id_usuario', as: 'profesionales' });
models.Profesional.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

models.Usuario.hasMany(models.Cliente, { foreignKey: 'id_usuario', as: 'clientes' });
models.Cliente.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

models.Profesional.hasMany(models.Sesion, { foreignKey: 'id_profesional', as: 'sesiones' });
models.Sesion.belongsTo(models.Profesional, { foreignKey: 'id_profesional', as: 'profesional' });

models.Cliente.hasMany(models.Sesion, { foreignKey: 'id_cliente', as: 'sesiones' });
models.Sesion.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

models.Precio.hasMany(models.Sesion, { foreignKey: 'id_precio', as: 'sesiones' });
models.Sesion.belongsTo(models.Precio, { foreignKey: 'id_precio', as: 'precio' });

models.Sesion.hasOne(models.Valoracion, { foreignKey: 'id_sesion', as: 'valoracion' });
models.Valoracion.belongsTo(models.Sesion, { foreignKey: 'id_sesion', as: 'sesion' });

models.Profesional.hasMany(models.Pago, { foreignKey: 'id_profesional', as: 'pagos' });
models.Pago.belongsTo(models.Profesional, { foreignKey: 'id_profesional', as: 'profesional' });

module.exports = { sequelize, ...models };
