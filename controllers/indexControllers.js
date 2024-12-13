exports.Index = async (req, res) => {
    return res.render('index');
};
exports.CuervoBus = (req, res) => {
    res.render('cuervobus', { title: 'Transporte - CuervoBus' });
};
exports.Login = (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
};
exports.DescargarApk = (req, res) => {
    res.render('descargar-apk', { title: 'Descargar App' });
};
exports.Credenciales = (req, res) => {
    res.render('credenciales', { title: 'Credenciales' });
};
exports.Swagger = (req, res) => {
    res.render('swagger', { title: 'Swagger API Docs' });
};
