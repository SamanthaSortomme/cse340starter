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
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  );

module.exports = router;

