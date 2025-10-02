const { DataTypes, Model } = require('sequelize');

class Cliente extends Model {
  static initModel(sequelize) {
    Cliente.init({
      id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      nombre_completo: { type: DataTypes.STRING(255) },
      telefono: { type: DataTypes.STRING(50) },
      nombre_usuario: { type: DataTypes.STRING(100) },
      ciudad: { type: DataTypes.STRING(100) },
      codigo_postal: { type: DataTypes.STRING(20) },
      ingreso: { type: DataTypes.FLOAT, defaultValue: 0 },
      estado: { type: DataTypes.STRING(100) }
    }, {
      sequelize,
      tableName: 'clientes'
    });
    return Cliente;
  }
}

module.exports = Cliente;
