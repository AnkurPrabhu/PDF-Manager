const Share = require("../models/share");

exports.generateShare = (req, res, next) => {
  const { email, fileid } = req.body;
  console.log(req.body);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.res.status(400).json({
          error: "no such user found ",
        });
      } else {
        access = new Access({
          fileId: fileid,
          userId: user._id,
        });

        return access.save();
      }
    })
    .then(() => {
      res.json({
        success: "saved successfully",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: "Something went wrong pls try again",
      });
    });
};
