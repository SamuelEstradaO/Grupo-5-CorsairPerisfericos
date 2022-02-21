const { check } = require("express-validator");
const path = require("path");

const validarProducto = [
  check("productName")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres."),
  check("productDescription")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres."),
  check("imgProduct").custom((value, { req }) => {
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
  check("productFeatures")
    .isLength({ min: 40 })
    .withMessage("La característica debe tener al menos 40 caracteres."),
  check("price").notEmpty().withMessage("El precio es obligatorio.").bail()
    .isNumeric().withMessage("El precio debe ser un número."),
  check("stock").notEmpty().withMessage("El stock es obligatorio.").bail()
    .isNumeric().withMessage("El stock debe ser un número."),

  check("category").notEmpty().withMessage("La categoria es obligatoria."),
];

module.exports = validarProducto;
