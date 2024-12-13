const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const Alumno = require("../models/Alumno");
const Tutor = require("../models/Tutor");
const Carrera = require("../models/carreras")

// Dashboard del tutor
exports.dashboard = async (req, res) => {
  try {
    const { matricula } = req.session.user;

    const tutor = await Tutor.findOne({ where: { matricula } });

    if (!tutor) {
      return res.status(404).render("error", { message: "Tutor no encontrado." });
    }

    res.render("tutor", { tutor });
  } catch (error) {
    console.error("Error al cargar el dashboard del tutor:", error);
    res.status(500).render("error", { message: "Error interno del servidor." });
  }
};

// Obtener lista de alumnos
exports.getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      where: { matriculaTutor: req.session.user.matricula },
      attributes: [
        "id",
        "nombre",
        "apellidos",
        "matricula",
        "telefono",
        "correo",
        "cuatrimestre",
        "grupo",
        "activa",
        "tipoCarrera",
      ],
    });
    res.json(alumnos);
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    res.status(500).json({ message: "Error al obtener los alumnos." });
  }
};

// Agregar alumno
exports.addAlumno = async (req, res) => {
  const { nombre, apellidos, matricula, contraseña, telefono, correo, cuatrimestre, grupo, tipoCarrera } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await Alumno.create({
      nombre,
      apellidos,
      matricula,
      contraseña: hashedPassword,
      telefono,
      correo,
      cuatrimestre,
      grupo,
      activa: 1,
      tipoCarrera,
      idRol: 4,
      matriculaTutor: req.session.user.matricula,
    });

    res.status(201).json({ message: "Alumno agregado exitosamente." });
  } catch (error) {
    console.error("Error al agregar el alumno:", error);
    res.status(500).json({ message: "Error al agregar el alumno." });
  }
};

// Editar alumno
exports.editAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, matricula, contraseña, telefono, correo, cuatrimestre, grupo, tipoCarrera } = req.body;

  try {
    const alumno = await Alumno.findByPk(id);

    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado." });
    }

    const updatedData = {
      nombre,
      apellidos,
      matricula,
      telefono,
      correo,
      cuatrimestre,
      grupo,
      tipoCarrera,
    };

    if (contraseña) {
      updatedData.contraseña = await bcrypt.hash(contraseña, 10);
    }

    await alumno.update(updatedData);

    res.json({ message: "Alumno actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    res.status(500).json({ message: "Error al actualizar el alumno." });
  }
};

// Editar alumno
exports.deleteAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, matricula, contraseña, telefono, correo, cuatrimestre, grupo, tipoCarrera } = req.body;

  try {
    const alumno = await Alumno.findByPk(id);

    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado." });
    }

    const updatedData = {
      nombre,
      apellidos,
      matricula,
      telefono,
      correo,
      cuatrimestre,
      grupo,
      tipoCarrera,
      activa:0,
    };

    if (contraseña) {
      updatedData.contraseña = await bcrypt.hash(contraseña, 10);
    }

    await alumno.update(updatedData);

    res.json({ message: "Alumno actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    res.status(500).json({ message: "Error al actualizar el alumno." });
  }
};

exports.getCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.findAll({
      attributes: ["idCarrera", "nombre", "clave"],
    });

    res.status(200).json(carreras);
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
    res.status(500).json({ message: "Error al obtener las carreras." });
  }
};
