const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation');
const utilities = require('../utilities');

//These lines fixed my code it now has a body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/register', utilities.handleErrors(accountController.buildRegister));


router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildAccManagement));
// router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement)) This is the c/p from assignment


router.post(
    "/register",
    regValidate.validate.registrationRules(),
    regValidate.validate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  );

router.post(
    "/login",
    regValidate.logValidate.loginRules(),
    regValidate.logValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  );

router.get('/logout', utilities.handleErrors(accountController.accountLogout));

router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
);

router.post(
  "/account-update",
  utilities.checkLogin,
  regValidate.validate.updateAccountRules(),
  regValidate.validate.checkUpdatedData,
  utilities.handleErrors(accountController.accountUpdate)
);

router.post(
  "/change-password",
  utilities.checkLogin,
    // regValidate.validate.changePasswordRules,
  utilities.handleErrors(accountController.changePassword)
);


  //process login not a function at this time========================================
module.exports = router;

