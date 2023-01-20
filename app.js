require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
var bodyParser = require('body-parser');
const expressSession = require("express-session");
const golferController = require("./controllers/golfer");
const scorecardController = require("./controllers/scorecard");
const courseController = require("./controllers/course");
const userController = require("./controllers/user");
const app = express();
const User = require("./models/User");

app.set("view engine", "ejs");

const { MONGODB_URI, MONGODB_PROD_URI } = process.env;

mongoose.connect(MONGODB_PROD_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({secret: 'cookie', cookie: { expires: new Date(253402300000000)}}))

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const userAuth = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if(!user){
    return res.redirect('/');
  }
  next()
}


app.get("/", (req, res) => {  
  res.render("index");
});
app.get("/create-user", (req, res) => {
  res.render("create-user", { errors: {} });
});
app.post("/create-user", userController.create);

app.get("/login", (req, res) => {
  res.render("login", { errors: {} });
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user=false;
  res.redirect('/?message=logged out successfully');
})

app.get("/golfers", userAuth, golferController.list);
app.get("/golfers/delete/:id", userAuth, golferController.delete);
app.get("/golfers/update/:id", userAuth, golferController.edit);
app.post("/golfers/update/:id", userAuth, golferController.update);

app.get("/courses", userAuth, courseController.list);
app.get("/courses/delete/:id", userAuth, courseController.delete);
app.get("/courses/update/:id", userAuth, courseController.edit);
app.post("/courses/update/:id", userAuth, courseController.update);

app.get("/scorecards", userAuth, scorecardController.list);
app.get("/scorecards/delete/:id", userAuth, scorecardController.delete);

app.get("/create-golfer", userAuth, (req, res) => {
  res.render("create-golfer", { errors: {} });
});
app.post("/create-golfer", userAuth, golferController.create);

app.get("/create-course", userAuth, courseController.createView);
app.post("/create-course", userAuth, courseController.create);

app.get("/create-scorecard", userAuth, scorecardController.createView);
app.post("/create-scorecard", userAuth, scorecardController.create);


app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
