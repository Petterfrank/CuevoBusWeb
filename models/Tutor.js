const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tutor = sequelize.define(
  "Tutor",
  {
    idTutor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    remember_token: {
      type: DataTypes.STRING,
    },
    idCarrera: {
      type: DataTypes.INTEGER,
      references: {
        model: "carreras", // Nombre de la tabla de carreras
        key: "idCarrera",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // Nombre de la tabla de roles
        key: "idRol",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    img: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tutores",
    freezeTableName: true,
    timestamps: false, // No se especificaron createdAt ni updatedAt en la tabla
  }
);

module.exports = Tutor;
