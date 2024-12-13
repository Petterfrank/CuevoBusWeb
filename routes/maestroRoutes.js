const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.render("maestro", { message: "Bienvenido al panel de Maestros" });
});

module.exports = router;
