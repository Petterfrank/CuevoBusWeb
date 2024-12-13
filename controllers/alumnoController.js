const Alumno = require("../models/Alumno");
const QRCode = require("qrcode");

const fs = require("fs");
const path = require("path");

exports.getProfile = async (req, res) => {
  try {
    const { matricula } = req.session.user;

    // Obtener los datos del alumno desde la base de datos
    const alumno = await Alumno.findOne({ where: { matricula } });

    if (!alumno) {
      return res
        .status(404)
        .render("error", { message: "Alumno no encontrado" });
    }

    // Generar el código QR con la matrícula
    const qrCodeUrl = await QRCode.toDataURL(alumno.matricula.toString());

    // Renderizar la vista con los datos del alumno y el QR
    res.render("alumno", { alumno, qrCodeUrl });
  } catch (error) {
    console.error("Error al obtener el perfil del alumno:", error);
    res.status(500).render("error", { message: "Error interno del servidor" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { matricula } = req.session.user;
    const { telefono, correo } = req.body;
    let imagen = null;

    if (req.file) {
      imagen = `/uploads/${req.file.filename}`;
    }

    const updatedData = {
      telefono,
      correo,
    };

    if (imagen) {
      updatedData.imagen = imagen;
    }

    const alumno = await Alumno.findOne({ where: { matricula } });

    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado." });
    }

    await alumno.update(updatedData);
    res.status(200).json({ message: "Perfil actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil." });
  }
};
