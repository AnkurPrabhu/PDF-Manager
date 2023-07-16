module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(400).json({
      error: "please login first",
    });
  }
  next();
};
