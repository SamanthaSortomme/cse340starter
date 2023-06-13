const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation');
const utilities = require('../utilities');



router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/register', accountController.buildRegister);
router.get('/', accountController.getAccount);
router.post('/register', (req) => {
    console.log(req.body)
    debugger
})
// router.post(
//     "/register",
//     regValidate.registrationRules(),
//     regValidate.checkRegData,
//     utilities.handleErrors(accountController.registerAccount)
//   );

module.exports = router;

