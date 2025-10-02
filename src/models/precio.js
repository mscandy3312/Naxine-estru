const { DataTypes, Model } = require('sequelize');

class Precio extends Model {
  static initModel(sequelize) {
    Precio.init({
      id_precio: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      numero_sesion: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1 },
      nombre_paquete: { type: DataTypes.STRING(255) },
      duracion: { type: DataTypes.STRING(100) },
      modalidad: { type: DataTypes.STRING(100) },
      horario: { type: DataTypes.STRING(255) },
      ordenes_totales: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
      ingresos_totales: { type: DataTypes.FLOAT, defaultValue: 0 },
      fecha: { type: DataTypes.DATEONLY },
      dias_disponibles: { type: DataTypes.STRING(255) },
      hora_desde: { type: DataTypes.TIME },
      hora_hasta: { type: DataTypes.TIME }
    }, {
      sequelize,
      tableName: 'precios'
    });
    return Precio;
  }
}

module.exports = Precio;
