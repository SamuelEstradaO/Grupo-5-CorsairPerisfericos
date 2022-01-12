const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

const checkLoginMid = require("../middlewares/checkLoginMid");
// Multer settings
const uploadFile = require("../middlewares/multerProducts");

router.get("/", productsController.products);
router.get("/detail/:id", productsController.product);
router.get("/search", productsController.search);
router.get("/cart", productsController.cart);
router.get("/create", checkLoginMid, productsController.create);
router.post("/", checkLoginMid, uploadFile.single('imgProduct'), productsController.newProduct);
router.get("/edit/:id", checkLoginMid, productsController.edit);
router.put("/:id", checkLoginMid, uploadFile.single('imgProduct'), productsController.update);
router.delete("/:id", checkLoginMid, productsController.delete);


module.exports = router;
