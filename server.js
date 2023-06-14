
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const app = express()
const utilities = require('./utilities');
const errorRoute = require('./routes/errorRoute');
const session = require("express-session")
const pool = require('./database/')
// const accountRoute = require('./routes/accountRoute');
const flash = require('connect-flash');
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash());
app.use(errorRoute);
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use('/account', require('./routes/accountRoute'));
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
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav,
    errors: null
  })
})

const port = process.env.PORT
const host = process.env.HOST
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
