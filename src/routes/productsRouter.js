const express = require('express');
const router = express.Router();

router.get('/productDetail', (req, res) => {
    res.render('./products/productDetail');
});
router.get('/productCart', (req, res) => {
    res.render('./products/productCart');
});

module.exports = router;