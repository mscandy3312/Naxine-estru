const { DataTypes, Model } = require('sequelize');

class Valoracion extends Model {
  static initModel(sequelize) {
    Valoracion.init({
      id_valoracion: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      id_sesion: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      rating: { type: DataTypes.INTEGER.UNSIGNED, validate: { min: 1, max: 5 } },
      mensaje: { type: DataTypes.TEXT },
      fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      estado: { type: DataTypes.STRING(100), defaultValue: 'publicado' }
    }, {
      sequelize,
      tableName: 'valoraciones'
    });
    return Valoracion;
  }
}

module.exports = Valoracion;
