const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const accountController = require('../controllers/accountController');

router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/register', accountController.buildRegistration);
// async function buildLogin(req, res, next) {
//   let nav = await utilities.getNav();
//   res.render('account/login', {
//     title: 'Login',
//     nav,
//   });
// }

// router.get('/', accountController.getAccount);


// router.get('/login', buildLogin);
// router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.get('/', accountController.getAccount);

module.exports = router;

