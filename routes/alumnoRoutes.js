const express = require("express");
const multer = require("multer");
const router = express.Router();
const alumnoController = require("../controllers/alumnoController");

// Configuración de multer para subir imágenes
const upload = multer({ dest: "uploads/" });

router.get("/perfil", alumnoController.getProfile);
router.post("/editar", upload.single("imagen"), alumnoController.editProfile);

module.exports = router;
