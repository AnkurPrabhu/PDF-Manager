const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  },
  { timestamps: true }
);
// commentSchema.methods.addReply = function (comment) {
//   const repliesList = [...this.replies.items];

//   repliesList.push({
//     commendId: comment._id,
//   });

//   const replies = {
//     items: repliesList,
//   };

//   this.replies = replies;
//   return this.save();
// };
module.exports = mongoose.model("Comment", commentSchema);
