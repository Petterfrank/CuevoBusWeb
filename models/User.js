const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("alumnos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
