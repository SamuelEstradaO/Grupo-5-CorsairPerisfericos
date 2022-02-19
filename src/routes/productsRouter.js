const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const checkLoginMid = require("../middlewares/checkLoginMid");
const checkAdminMid = require("../middlewares/checkAdminMid");
const validarProducto = require("../middlewares/validarProducto");

// Multer settings
const uploadFile = require("../middlewares/multerProducts");

router.get("/", productsController.products);
router.get("/detail/:id", productsController.product);
router.get("/search", productsController.search);
router.get("/cart", productsController.cart);
router.get("/create", checkLoginMid, checkAdminMid, productsController.create);
router.post(
  "/",
  checkLoginMid,
  checkAdminMid,
  uploadFile.single("imgProduct"),
  validarProducto,
  productsController.newProduct
);
router.get("/edit/:id", checkLoginMid, checkAdminMid, productsController.edit);
router.put(
  "/:id",
  checkLoginMid,
  uploadFile.single("imgProduct"),
  validarProducto,
  productsController.update
);
router.delete("/:id", checkLoginMid, checkAdminMid, productsController.delete);

router.get("/*", (req, res) => res.render("notFound"));

module.exports = router;
