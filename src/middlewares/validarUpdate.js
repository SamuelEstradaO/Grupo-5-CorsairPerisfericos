const { check } = require("express-validator");
const req = require("express/lib/request");
const path = require("path");

const validarUpdate = [
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
  check("password").custom((value, { req }) => {
    if (value && value.length < 6) {
      throw new Error("El password debe tener al menos 6 caracteres");
    }
    return true;
  }),

  check("confirm-user-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
];

module.exports = validarUpdate;
