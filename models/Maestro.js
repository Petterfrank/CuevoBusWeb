const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Maestro = sequelize.define("Maestro", {
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
    defaultValue: 3, // Suponiendo que el rol "Maestro" es 3
  },
});

module.exports = Maestro;
