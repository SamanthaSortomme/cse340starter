const utilities = require('../utilities');

// Deliver login view
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render('account/login', {
    title: 'Login',
    nav,
    flash: req.flash(),
  });
}
async function buildRegistration(req, res, next) {
  let nav = await utilities.getNav();
  res.render('account/register', {
    title: 'Registration',
    nav,
  });
}
module.exports = {
  buildLogin,
  buildRegistration,
  getAccount: (req, res, next) => {
    res.render('account/login', { title: 'Login', flash: req.flash() });
  },
};
