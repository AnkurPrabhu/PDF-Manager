const Access = require("../models/access");
const User = require("../models/user");

exports.giveAccess = (req, res, next) => {
  const { email, fileId } = req.body;
  console.log("body:", req.body);
  User.findOne({ email: email })
    .then((user) => {
      access = new Access({
        fileId: fileId,
        userId: user._id,
      });

      access.save().then(() => {
        res.json({
          success: "Shared access",
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "no user in database",
      });
    });
};
