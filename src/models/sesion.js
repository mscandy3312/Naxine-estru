const { DataTypes, Model } = require('sequelize');

class Sesion extends Model {
  static initModel(sequelize) {
    Sesion.init({
      id_sesion: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      id_cliente: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      id_profesional: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      id_precio: { type: DataTypes.INTEGER.UNSIGNED },
      numero_pedido: { type: DataTypes.STRING(255) },
      fecha: { type: DataTypes.DATE },
      estado: { type: DataTypes.STRING(100), defaultValue: 'pendiente' },
      acciones: { type: DataTypes.TEXT },
      producto: { type: DataTypes.STRING(255) },
      metodo_pago: { type: DataTypes.STRING(100) }
    }, {
      sequelize,
      tableName: 'sesiones'
    });
    return Sesion;
  }
}

module.exports = Sesion;
