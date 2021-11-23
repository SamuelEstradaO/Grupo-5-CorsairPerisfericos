const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");


// Multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})

const uploadFile = multer({ storage });

router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.post("/register", uploadFile.single('avatar'), usersController.newUser);
router.delete("/:id", usersController.delete);
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", uploadFile.single('avatar'), usersController.update);




module.exports = router;
