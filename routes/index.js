const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexControllers');

// Ruta principal
router.get('/', indexController.Index);

// Rutas para las vistas
router.get('/cuervobus', indexController.CuervoBus);
router.get('/login', indexController.Login);
router.get('/descargar-apk', indexController.DescargarApk);

module.exports = router;
