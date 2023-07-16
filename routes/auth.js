const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();

router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);

router.get("/checkLogin", authController.checkLogin);
router.post("/logout", authController.postLogout);
module.exports = router;
