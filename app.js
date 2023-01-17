require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");



/**
 * Controllers (route handlers).
 */
const golferController = require("./controllers/golfer");
const scorecardController = require("./controllers/scorecard");

const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { WEB_PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create-golfer", (req, res) => {
  res.render("create-golfer", { errors: {} });
});
app.post("/create-golfer", golferController.create);

app.get("/golfers", golferController.list);
app.get("/golfers/delete/:id", golferController.delete);

app.get("/scorecards", scorecardController.list);
app.get("/scorecards/delete/:id", scorecardController.delete);



app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
