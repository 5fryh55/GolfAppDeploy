require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");


const golferController = require("./controllers/golfer");
const scorecardController = require("./controllers/scorecard");
const courseController = require("./controllers/course");

const app = express();
app.set("view engine", "ejs");

const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
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

app.get("/", (req, res) => {
  
  res.render("index");
});

app.get("/golfers", golferController.list);
app.get("/golfers/delete/:id", golferController.delete);

app.get("/courses", courseController.list);
app.get("/courses/delete/:id", courseController.delete);

app.get("/scorecards", scorecardController.list);
app.get("/scorecards/delete/:id", scorecardController.delete);

app.get("/create-golfer", (req, res) => {
  res.render("create-golfer", { errors: {} });
});
app.post("/create-golfer", golferController.create);

app.get("/create-course", courseController.createView);
app.post("/create-course", courseController.create);

app.get("/create-scorecard", scorecardController.createView);
app.post("/create-scorecard", scorecardController.create);


app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
