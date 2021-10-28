const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('./users/login')});
    
router.get('/signUp', (req, res) => {
    res.render('./users/register')});

module.exports = router;