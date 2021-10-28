const express = require('express');
const router = express.Router();

router.get('/productDetail', (req, res) => {
    res.render('productDetail');
});
router.get('/productCart', (req, res) => {
    res.render('productCart');
});

module.exports = router;