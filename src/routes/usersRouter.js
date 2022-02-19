const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


const checkLoginMid = require("../middlewares/checkLoginMid");
const guestOnlyMid = require("../middlewares/guestOnlyMid");
const logoutMid = require("../middlewares/logoutMid");
//Validaciones
const validarLogin = require("../middlewares/validarLogin");
const validarRegistro = require("../middlewares/validarRegistro");
const validarUpdate = require("../middlewares/validarUpdate");
// Multer settings
const uploadFile = require("../middlewares/multerUsers");

router.get("/login", guestOnlyMid, usersController.login);
router.post("/login", guestOnlyMid, validarLogin, usersController.newLogin);
router.get("/register", guestOnlyMid, usersController.register);
router.post("/register", guestOnlyMid, uploadFile.single('avatar'), validarRegistro, usersController.newUser);
router.delete("/:id", checkLoginMid, usersController.delete);
router.get("/edit/:id", checkLoginMid, usersController.edit);
router.put("/edit/:id", checkLoginMid, uploadFile.single('avatar'), validarUpdate, usersController.update);
router.get("/logout", logoutMid, usersController.logout);

//comprobar login iniciado
router.get("/logged", usersController.logged);

router.get("/*", (req, res) => res.render("notFound"));



module.exports = router;
