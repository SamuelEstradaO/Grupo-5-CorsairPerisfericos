const { check } = require("express-validator");

const validarLogin = [
    check("email").isEmail().withMessage("El email no es valido"),
    check("password").isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
]

module.exports = validarLogin;