const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.post("/register", usersController.newUser);
router.delete("/:id", usersController.delete);
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", usersController.edit);


module.exports = router;
