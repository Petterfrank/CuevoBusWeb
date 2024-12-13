const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carga variables de entorno desde .env

// Configuración de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false, // Desactiva los logs de SQL en la consola
});

module.exports = sequelize;
