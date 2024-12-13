const { Op } = require("sequelize"); // Importar operadores de Sequelize
const Alumno = require("../models/Alumno"); // Importar modelo Alumno
const Tutor = require("../models/Tutor"); // Importar modelo Tutor
const Maestro = require("../models/Maestro"); // Importar modelo Maestro

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Buscar al usuario por correo o matrícula
    let user = await Alumno.findOne({
      where: {
        [Op.or]: [{ correo: usuario }, { matricula: usuario }],
      },
    });

    let role = "Alumno";

    if (!user) {
      user = await Tutor.findOne({
        where: {
          [Op.or]: [{ correo: usuario }, { matricula: usuario }],
        },
      });
      role = "Tutor";
    }

    if (!user) {
      user = await Maestro.findOne({
        where: {
          [Op.or]: [{ correo: usuario }, { matricula: usuario }],
        },
      });
      role = "Maestro";
    }

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    // Guardar en la sesión
    req.session.user = {
        matricula: user.matricula, // Guardar matrícula
        nombre: user.nombre, // Guardar nombre
        role, // Guardar rol
      };

    // Redirigir según el rol
    switch (role) {
      case "Alumno":
        return res.json({ redirect: "/alumnos/perfil" });
      case "Tutor":
        return res.json({ redirect: "/tutores/dashboard" });
      case "Maestro":
        return res.json({ redirect: "/maestros/dashboard" });
      default:
        return res.status(403).json({ message: "Rol no autorizado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
