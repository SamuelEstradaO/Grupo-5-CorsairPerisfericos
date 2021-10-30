const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/productDetail", productsController.product);
router.get("/productCart", productsController.cart);
router.get("/productAdmin", productsController.admin);

module.exports = router;
