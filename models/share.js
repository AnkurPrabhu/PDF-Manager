const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shareSchema = new Schema(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: "file",
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Share", shareSchema);
