
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const app = express()
const utilities = require('./utilities');
const errorRoute = require('./routes/errorRoute');

app.use(errorRoute);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500);
//   res.render('errors/error', {
//     title: 'Server Error',
//     message: 'Internal Server Error',
//   });
// });

app.get('/favicon.ico', (req, res) => res.status(204));
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.use(require("./routes/static"))
app.get("/", utilities.handleErrors(baseController.buildHome));
app.use("/inv", require("./routes/inventoryRoute"))
app.get('/', (req, res) => {
  // const year = new Date().getFullYear();
  res.render('index', { title: 'Home', year });
});
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})




/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'This is the error you wanted and this is the error you got'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
