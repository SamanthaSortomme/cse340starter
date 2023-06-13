const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation');
const utilities = require('../utilities');

//These lines fixed my code it now has a body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/register', accountController.buildRegister);
router.get('/', accountController.getAccount);
// router.post('/register', (req) => {
//     console.log(req.body)

// })
router.post(
    "/register",
    regValidate.validate.registrationRules(),
    regValidate.validate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  );
// Process the login attempt
// router.post(
//     "/login",
//     (req, res) => {
//       res.status(200).send('login process')
//     }
//   )
router.post(
    "/login",
    regValidate.logValidate.loginRules(),
    regValidate.logValidate.checkLoginData,
    utilities.handleErrors(accountController.processLogin)
  );
module.exports = router;

