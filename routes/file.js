const express = require("express");
const isAuth = require("../middleware/is-auth");
const fileController = require("../controllers/file");

const router = express.Router();
router.get("/allfiles", isAuth, fileController.getAllFiles);
router.post("/upload", isAuth, fileController.postUpload);
router.get("/getToken/:fileId", isAuth, fileController.getToken);
router.get("/token/:tokenId", fileController.getFileFromToken);
router.get("/getfile/:fileId", fileController.getFile);
module.exports = router;
