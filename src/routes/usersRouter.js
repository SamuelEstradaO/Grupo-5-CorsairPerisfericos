const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const { check } = require("express-validator");


const checkLoginMid = require("../middlewares/checkLoginMid");
const guestOnlyMid = require("../middlewares/guestOnlyMid");



//Validaciones
const validarLogin = [
    check("email").isEmail().withMessage("El email no es valido"),
    check("password").isLength({ min: 6 }).withMessage("El password debe tener al menos 6 caracteres"),
]

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

router.get("/login", guestOnlyMid, usersController.login);
router.post("/login", guestOnlyMid, validarLogin, usersController.newLogin);
router.get("/register", guestOnlyMid, usersController.register);
router.post("/register", guestOnlyMid, uploadFile.single('avatar'), validarRegistro, usersController.newUser);
router.delete("/:id", checkLoginMid, usersController.delete);
router.get("/edit/:id", checkLoginMid, usersController.edit);
router.put("/edit/:id", checkLoginMid, uploadFile.single('avatar'), usersController.update);

//comprobar login iniciado
router.get("/logged", usersController.logged);




module.exports = router;
