const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// router.get('/productDetail', (req, res) => {
//     res.render('./products/productDetail');
// });
// router.get('/productCart', (req, res) => {
//     res.render('./products/productCart');
// });
router.get("/productDetail", productsController.product);
router.get("/productCart", productsController.cart);

module.exports = router;
