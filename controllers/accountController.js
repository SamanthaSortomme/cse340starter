const utilities = require('../utilities');

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

// Deliver registration view
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}


// Handle registration form submission
async function register(req, res, next) {
  // Process the registration data and perform necessary actions
  // Example: Save user data to the database

  // Redirect the user to a success page or login page
  res.redirect('/account/login');
}

module.exports = {
  buildLogin,
  buildRegister,
  register,
  getAccount: (req, res, next) => {
    res.render('account/login', { title: 'Login', flash: req.flash() });
  },
};
