const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");
const authRoutes = require("./authRoutes");

//Rutas para Dashboards
const alumnoRoutes = require("./alumnoRoutes");
const maestroRoutes = require("./maestroRoutes");
const tutorRoutes = require("./tutoRoutes");
// Ruta para cerrar sesión
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }
    // Redirigir al inicio de sesión después del logout
    res.redirect("/login");
  });
});

// Ruta principal
router.get("/", indexController.Index);

router.use("/auth", authRoutes);
router.use("/alumnos", alumnoRoutes);
router.use("/maestro", maestroRoutes);
router.use("/tutores", tutorRoutes);

// Rutas para las vistas
router.get("/cuervobus", indexController.CuervoBus);
router.get("/login", indexController.Login);
router.get("/descargar-apk", indexController.DescargarApk);

// Ruta para la página de contacto
router.get("/contacto", (req, res) => {
  res.render("contacto", { success: false });
});

router.post("/contacto", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contacto recibido: ${name}, ${email}, ${message}`);
  res.render("contacto", { success: true });
});

// Ruta para la política de privacidad
router.get("/privacidad", (req, res) => {
  res.render("privacy");
});

module.exports = router;
