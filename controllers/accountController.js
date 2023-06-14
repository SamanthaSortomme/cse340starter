const utilities = require('../utilities');
const Account = require('../models/account-model');
const bcrypt = require("bcryptjs")



// Deliver login view
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render('account/login', {
    title: 'Login',
    nav,
    flash: req.flash(),
    errors: null,
  });
}


async function processLogin(req, res) {
  let nav = await utilities.getNav()
  const {account_email, account_password } = req.body
  let hashedPassword
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    console.log("Hashing Error:", error)
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
  const userResult = await Account.loginAccount(
    account_email,
    hashedPassword
  )
  if (userResult) {
    console.log(userResult)
    req.flash(
      "notice",
      `Congratulations, you\'re logged in. Please log in for an endless cycle because I don't know how to direct you.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the login failed.")
    res.status(501).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }
}




async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
    console.log("Hashed Password:", hashedPassword)
  } catch (error) {
    console.log("Hashing Error:", error)
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await Account.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}
async function register(req, res, next) {
  res.redirect('/account/login');
}
module.exports = {
  buildLogin,
  buildRegister,
  register,
  registerAccount,
  // processLogin,
  getAccount: (req, res, next) => {
    res.render('account/login', { title: 'Login', flash: req.flash() });
  },
};
