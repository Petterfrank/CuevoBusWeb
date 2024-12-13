exports.isAdmin = (req, res, next) => {
    if (req.user.idRol !== 1) {
      return res.status(403).json({ message: "Acceso denegado: Administradores solamente" });
    }
    next();
  };
  
  exports.isTutor = (req, res, next) => {
    if (req.user.idRol !== 2) {
      return res.status(403).json({ message: "Acceso denegado: Tutores solamente" });
    }
    next();
  };
  
  exports.isMaestro = (req, res, next) => {
    if (req.user.idRol !== 3) {
      return res.status(403).json({ message: "Acceso denegado: Maestros solamente" });
    }
    next();
  };
  