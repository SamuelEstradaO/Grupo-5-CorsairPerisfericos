const { check } = require("express-validator");
const path = require("path");

const validarRegistro = [
  check("firstName")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),
  check("lastName")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres."),
  check("avatar").custom((value, { req }) => {
    if (
      req.file != undefined &&
      path.extname(req.file.filename) != ".png" &&
      path.extname(req.file.filename) != ".jpg" &&
      path.extname(req.file.filename) != ".jpeg"
    ) {
      throw new Error(
        "Debe seleccionar un formato de imagen válido (png/jpg/jpeg)."
      );
    }
    return true;
  }),
  check("email").isEmail().withMessage("El email no es valido") /*.bail()
         .custom((value) => {
            let user = users.find(value);
            if (user != undefined) {
                throw new Error("El email ya esta registrado")
            }
            return true;
        }), */,
  check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
];

module.exports = validarRegistro;

//Preguntar a Nacho sobre: como evitar que si el archivo no es una imagen, no se guarde en la base de datos.
