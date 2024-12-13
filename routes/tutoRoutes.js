const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");



router.get("/dashboard", tutorController.dashboard);
router.get("/alumnos", tutorController.getAlumnos);
router.post("/alumnos", tutorController.addAlumno);
router.post("/alumnos/:id/edit", tutorController.editAlumno);
router.post("/alumnos/:id/delete", tutorController.deleteAlumno);
router.get("/carreras", tutorController.getCarreras);
module.exports = router;
