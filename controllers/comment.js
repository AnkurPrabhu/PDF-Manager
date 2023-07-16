const comment = require("../models/comment");
const Comment = require("../models/comment");

exports.postComment = (req, res, next) => {
  const { fileId, comment } = req.body;

  let userId = undefined;
  if (req.session.isLoggedIn) {
    userId = req.session.user._id;
  }
  db_comment = new Comment({
    fileId: fileId,
    userId: userId,
    comment: comment,
  });

  db_comment
    .save()

    .then(() => {
      res.json({
        success: "Commented successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err: "NOT able to save you comment in DB",
      });
    });
};

exports.postReply = (req, res, next) => {
  const { fileId, reply, parentCommentId } = req.body;

  let userId;

  if (req.session.isLoggedIn) {
    userId = req.session.user._id;
  }

  db_comment = new Comment({
    fileId: fileId,
    userId: userId,
    comment: reply,
    parentCommentId: parentCommentId,
  });

  db_comment
    .save()
    .then(() => {
      res.json({
        success: "replied successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err: "NOT able to save you comment in DB",
      });
    });
};

exports.getComments = (req, res, next) => {
  Comment.find({ fileId: req.params.fileId })
    .populate("userId", "name email -_id ")
    // .populate("userId", "name")
    // .select(" -_id -userId")
    .then((comments) => {
      const commentObj = {};
      for (const comment of comments) {
        // Check if it's a parent comment
        if (!comment.parentCommentId) {
          // Create a new entry in the object for the parent comment
          commentObj[comment.id] = {
            ...comment,
            replies: [],
          };
        } else {
          // Find the parent comment in the object
          const parent = commentObj[comment.parentCommentId];

          // Add the reply to the parent comment's 'replies' array
          if (parent.replies) {
            parent.replies.push(comment);
          } else {
            parent.replies = [comment];
          }
        }
      }
      commentArray = [];
      // commentObj.keys(obj).forEach((key) => {
      //   console.log(key, obj[key]);
      // });

      for (var key in commentObj) {
        commentArray.push(commentObj[key]);
      }
      res.status(200).json({ success: "Success", comments: commentArray });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "not able to find in db",
      });
    });
};
