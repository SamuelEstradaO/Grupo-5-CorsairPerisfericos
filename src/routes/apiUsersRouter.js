const express = require("express");
const router = express.Router();
const apiUsersController = require("../controllers/apiUsersController");

router.get("/", apiUsersController.index);
router.get("/:id", apiUsersController.user);
router.get("/:id/image", apiUsersController.avatar);

module.exports = router;