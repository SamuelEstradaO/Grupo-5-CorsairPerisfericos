const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')});
    
router.get('/signUp', (req, res) => {
    res.render('register')});

module.exports = router;