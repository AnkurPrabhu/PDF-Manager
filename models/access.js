const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accessSchema = new Schema(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Access", accessSchema);
