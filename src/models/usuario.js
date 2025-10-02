const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class Usuario extends Model {
  static initModel(sequelize) {
    Usuario.init({
      id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true, // null cuando se registra por OAuth
      },
      nombre: { type: DataTypes.STRING(255) },
      role: { type: DataTypes.ENUM('admin','profesional','cliente','user'), defaultValue: 'user' },
      is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      oauth_provider: { type: DataTypes.STRING(50) },
      oauth_id: { type: DataTypes.STRING(255) }
    }, {
      sequelize,
      tableName: 'usuarios',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    });
    return Usuario;
  }

  async validatePassword(password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
  }
}

module.exports = Usuario;
