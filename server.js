
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const app = express()


app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.use(require("./routes/static"))
// Index route
app.get("/", baseController.buildHome)
// app.get("/", function (req, res) { res.render("index", {title: "Home"})
// })
// Inventory routes
app.use("/inv", require("./routes/inventoryRoute"))

app.get('/', (req, res) => {
  // const year = new Date().getFullYear();
  res.render('index', { title: 'Home', year });
});

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
