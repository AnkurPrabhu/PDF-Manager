const express = require("express");

const commentController = require("../controllers/comment");
const router = express.Router();
router.post("/comment", commentController.postComment);

router.post("/reply", commentController.postReply);
router.get("/getcomments/:fileId", commentController.getComments);

module.exports = router;
