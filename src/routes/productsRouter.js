const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/", productsController.products);
router.get("/detail/:id", productsController.product);
router.get("/cart", productsController.cart);
router.get("/create", productsController.create);
router.post("/", productsController.newProduct);
router.get("/edit/:id", productsController.edit);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete);


module.exports = router;
