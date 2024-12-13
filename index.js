const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require("express-session");
const listEndpoints = require('express-list-endpoints'); 

const app = express();

// Configuración de sesiones
app.use(
    session({
        secret: "mi-secreto",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Cambia a true si usas HTTPS
    })
);

// Middlewares generales
app.use(morgan('dev')); // Middleware de registro de solicitudes
app.use(express.json()); // Manejar JSON
app.use(express.urlencoded({ extended: true })); // Manejar formularios
app.use("/assets", express.static(path.join(__dirname, "assets"))); // Archivos estáticos

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importar y agrupar rutas (controladores)
const indexRoutes = require('./routes/index');
// Rutas agrupadas
app.use('/', indexRoutes); // Rutas del index
// Rutas agrupadas

// Middleware para mostrar todos los endpoints al acceder a "/endpoints"
app.get('/endpoints', (req, res) => {
    const endpoints = listEndpoints(app);
    res.json({
        totalRoutes: endpoints.length,
        routes: endpoints
    });
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});

// Middleware para manejar errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { message: 'Error interno del servidor' });
});

// Mostrar total de controladores al iniciar




// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Endpoints disponibles en: http://localhost:${PORT}/endpoints`);
});
