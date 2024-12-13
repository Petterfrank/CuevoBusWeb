const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Asegúrate de que esta ruta sea correcta para tu configuración

const Carrera = sequelize.define("Carrera", {
  idCarrera: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "carreras", // Asegúrate de que coincida con el nombre de la tabla en tu base de datos
  timestamps: false, // Si no tienes columnas `createdAt` y `updatedAt`
});

module.exports = Carrera;
