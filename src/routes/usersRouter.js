const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// router.get('/login', (req, res) => {
//     res.render('./users/login')});

// router.get('/signUp', (req, res) => {
//     res.render('./users/register')});
router.get("/login", usersController.login);
router.get("/register", usersController.register);

module.exports = router;
