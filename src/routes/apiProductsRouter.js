const express = require("express");
const router = express.Router();
const apiProductsController = require("../controllers/apiProductsController");

router.get("/", apiProductsController.index);
router.get("/:id", apiProductsController.detail);
router.get("/:id/image", apiProductsController.image);


module.exports = router;