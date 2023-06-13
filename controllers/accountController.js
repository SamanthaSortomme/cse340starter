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

module.exports = {
  buildLogin,
  getAccount: (req, res, next) => {
    res.render('account/login', { title: 'Login', flash: req.flash() });
  },
};
