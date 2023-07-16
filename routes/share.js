const express = require("express");
const isAuth = require("../middleware/is-auth");

const shareController = require("../controllers/share");

const router = express.Router();
router.get("/generateShare", isAuth, shareController.generateShare);

module.exports = router;
