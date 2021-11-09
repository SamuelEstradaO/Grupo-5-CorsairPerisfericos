const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/detail", productsController.product);
router.get("/cart", productsController.cart);
router.get("/create", productsController.create);
router.get("/edit/:id", productsController.edit);
router.get("/", productsController.products);

module.exports = router;
