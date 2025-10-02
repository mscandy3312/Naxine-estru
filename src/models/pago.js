const { DataTypes, Model } = require('sequelize');

class Pago extends Model {
  static initModel(sequelize) {
    Pago.init({
      id_pago: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      id_profesional: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      balance_general: { type: DataTypes.FLOAT, defaultValue: 0 },
      ventas: { type: DataTypes.FLOAT, defaultValue: 0 },
      comision: { type: DataTypes.FLOAT, defaultValue: 0 },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      especialidad: { type: DataTypes.STRING(255) },
      estado: { type: DataTypes.STRING(100), defaultValue: 'pendiente' },
      accion: { type: DataTypes.STRING(255) }
    }, {
      sequelize,
      tableName: 'pagos'
    });
    return Pago;
  }
}

module.exports = Pago;
