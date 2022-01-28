const { check } = require("express-validator");

const validarRegistro = [
    check("firstName").notEmpty().withMessage("El nombre no puede estar vacio"),
    check("lastName").notEmpty().withMessage("El apellido no puede estar vacio"),
    check("email").isEmail().withMessage("El email no es valido"),/*.bail()
         .custom((value) => {
            let user = users.find(value);
            if (user != undefined) {
                throw new Error("El email ya esta registrado")
            }
            return true;
        }), */
    check("password").isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
]

module.exports = validarRegistro;
