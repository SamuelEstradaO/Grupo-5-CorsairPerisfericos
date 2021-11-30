const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const { check } = require("express-validator");

//Validaciones
const validarLogin = [
    check("email").isEmail().withMessage("El email no es valido"),
    check("password").isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
]

const validarRegistro = [
    check("firstName").notEmpty().withMessage("El nombre no puede estar vacio"),
    check("lastName").notEmpty().withMessage("El apellido no puede estar vacio"),
    check("email").isEmail().withMessage("El email no es valido"),
    check("password").isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
]


// Multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})

const uploadFile = multer({ storage });

router.get("/login", usersController.login);
router.post("/login", validarLogin, usersController.newLogin);
router.get("/register", usersController.register);
router.post("/register", validarRegistro, uploadFile.single('avatar'), usersController.newUser);
router.delete("/:id", usersController.delete);
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", uploadFile.single('avatar'), usersController.update);

//comprobar login iniciado
router.get("/logged", usersController.logged);




module.exports = router;
