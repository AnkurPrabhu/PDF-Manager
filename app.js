require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

const path = require("path");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");

//session
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "process.env.SECRET",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//Port
const port = process.env.Port || 3001;

//static files

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      // You can implement your own logic here

      // For example, you could allow all origins:
      callback(null, true);

      // Or you could check if the origin is in a list of allowed domains:
      // var allowedOrigins = ["http://example.com", "http://anotherdomain.com"];
      // var isAllowedOrigin = allowedOrigins.includes(origin);
      // callback(isAllowedOrigin ? null : new Error("Origin not allowed"), isAllowedOrigin);
    },
    credentials: true,
  })
);
//routes
const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/file");
const commentRoutes = require("./routes/comment");
const shareRoutes = require("./routes/share");
const accessRoutes = require("./routes/access");

app.use("/api", authRoutes);
app.use("/api", fileRoutes);
app.use("/api", commentRoutes);
app.use("/api", shareRoutes);
app.use("/api", accessRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
      console.log(`app is running at ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
