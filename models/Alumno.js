const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Alumno = sequelize.define("Alumno", {
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
    matricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cuatrimestre: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activa: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ingresos: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    tipoCarrera: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deviceA_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deviceW_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idCarrera: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    matriculaTutor: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idHuella: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Alumno;
