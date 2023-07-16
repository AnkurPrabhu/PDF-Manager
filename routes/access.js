const express = require("express");
const isAuth = require("../middleware/is-auth");
const accessController = require("../controllers/access");

const router = express.Router();
router.post("/giveAccess", isAuth, accessController.giveAccess);
module.exports = router;
