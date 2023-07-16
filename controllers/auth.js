const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.postSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 12)
    .then((hashedpassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedpassword,
        files: { items: [] },
      });

      return user.save();
    })
    .then(() => {
      res.json({
        success: "saved successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: "NOT able to save user in DB",
      });
    });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.res.status(400).json({
          err: "email or password might be wrong",
        });
      }
      bcrypt.compare(password, user.password).then((domatch) => {
        if (domatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
            if (err) {
              console.log(err);
            }
            return res.json({
              success: "saved successfully",
            });
          });
        } else {
          return res.status(400).json({
            error: "email or password might be wrong",
          });
        }
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: "email or password might be wrong",
      });
    });
};

exports.checkLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.json({ isLoggedIn: false });
  } else {
    res.json({ isLoggedIn: true });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });

  res.json({ Success: "logged out successfully" });
};
