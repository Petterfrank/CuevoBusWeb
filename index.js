const express = require('express');
const path = require('path');
const morgan = require('morgan'); // Importar Morgan

const app = express();

const session = require("express-session");

app.use(
    session({
        secret: "mi-secreto", 
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Cambia a true si usas HTTPS
    })
);

app.use("/assets", express.static(path.join(__dirname, "assets")));
// Middleware para registrar solicitudes con Morgan
app.use(morgan('dev'));

// Middleware para manejar datos JSON y formularios
app.use(express.json()); // Para manejar cuerpos de solicitudes en formato JSON
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas principales
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


//Rutas para Dashboards
const alumnoRoutes = require("./routes/alumnoRoutes");
const maestroRoutes = require("./routes/maestroRoutes");
const tutorRoutes = require("./routes/tutoRoutes");
app.use("/alumnos", alumnoRoutes);
app.use("/maestro", maestroRoutes);
app.use("/tutores", tutorRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { message: 'Página no encontrada' });
});

// Middleware para manejar errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { message: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
