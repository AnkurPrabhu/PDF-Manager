const File = require("../models/file");
const crypto = require("crypto");
const Share = require("../models/share");
const Access = require("../models/access");
exports.postUpload = (req, res, next) => {
  const { filename, description, fileurl } = req.body;
  console.log(req.body);

  const file = new File({
    filename: filename,
    description: description,
    fileurl: fileurl,
    userId: req.session.user._id,
  });

  file
    .save()
    .then((result) => {
      console.log("Created File");
      res.status(200).json({ success: "saved successfully" });
    })

    .catch((err) => {
      return res.status(400).json({
        error: "not able to save the file in db",
      });
    });
};

exports.getAllFiles = (req, res, next) => {
  Access.find({ userId: req.session.user._id })
    .populate("userId")

    .then((results) => {
      let filearray = [];
      results.forEach((result) => {
        filearray.push(result.fileId);
      });

      File.find({
        $or: [{ userId: req.session.user._id }, { _id: { $in: filearray } }],
      })
        .select("filename description fileurl _id")
        // .populate("userId", "name")
        // .select(" -_id -userId")
        .then((files) => {
          res.status(200).json({ success: "Success", files: files });
        });
    })

    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "not able to find in db",
      });
    });
};

exports.getFile = (req, res, next) => {
  File.findOne({ _id: req.params.fileId })
    .select("filename description fileurl _id")
    // .populate("userId", "name")
    // .select(" -_id -userId")
    .then((file) => {
      res.status(200).json({ success: "success", file: file });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "not able to find in db",
      });
    });
};

exports.getFileFromToken = (req, res, next) => {
  console.log("hi");
  console.log("token is :", req.params.tokenId);
  Share.findOne({ accessToken: req.params.tokenId })
    .then((data) => {
      File.findOne({ _id: data.fileId })
        .select("filename description fileurl _id")
        // .populate("userId", "name")
        // .select(" -_id -userId")
        .then((file) => {
          res.status(200).json({ success: "success", file: file });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({
            error: "not able to find in db",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: "not able to find in db",
      });
    });
};

exports.getToken = (req, res, next) => {
  console.log(req.params.fileId);
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "not able to generate token",
      });
    }
    const token = buffer.toString("hex");

    File.findOne({ _id: req.params.fileId })
      .then((file) => {
        if (!file) {
          return res.status(400).json({
            error: "not able to generate token",
          });
        }

        share = new Share({
          fileId: req.params.fileId,
          accessToken: token,
        });

        share.save();
      })
      .then((result) => {
        // transporter.sendMail({
        //   to: req.body.email,
        //   from: "shop@node-complete.com",
        //   subject: "Password reset",
        //   html: `
        //     <p>You requested a password reset</p>
        //     <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        //   `,
        // });
        res
          .status(200)
          .json({ success: "Generated token successfully", token: token });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
