const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const baseController = require("./controllers/baseController");
const app = express();
const utilities = require("./utilities");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.use(require("./routes/static"));

app.get("/", utilities.handleErrors(baseController.buildHome), (req, res) => {
  const year = new Date().getFullYear();
  res.render("index", { title: "Home", year: year });
});

app.use("/inv", require("./routes/inventoryRoute"));
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const message =
    err.status == 404
      ? (err.message || "i")
      : "Oh no! There was a crash. Maybe try a different route?";
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  });
});

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
