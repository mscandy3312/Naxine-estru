const { DataTypes, Model } = require('sequelize');

class Profesional extends Model {
  static initModel(sequelize) {
    Profesional.init({
      id_profesional: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      id_stripe: { type: DataTypes.STRING(255) },
      nombre_completo: DataTypes.STRING(255),
      telefono: DataTypes.STRING(50),
      numero_colegiado: DataTypes.STRING(100),
      especialidad: DataTypes.STRING(255),
      direccion: DataTypes.STRING(255),
      rating: { type: DataTypes.FLOAT, defaultValue: 0 },
      biografia: DataTypes.TEXT,
      foto_perfil: DataTypes.STRING(255),
      certificaciones: DataTypes.TEXT
    }, {
      sequelize,
      tableName: 'profesionales'
    });
    return Profesional;
  }
}

module.exports = Profesional;
