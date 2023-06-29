// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const validate = require('../utilities/inventory-validation');
const utilities = require('../utilities');



// Route to build inventory by classification view
router.get("/", invController.viewInv);
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:carId", invController.buildByCarId);


router.get("/add-classification", invController.buildClassification);
router.post(
    "/add-classification",
    validate.classValidate.rules(),
    validate.classValidate.checkData,
    utilities.handleErrors(invController.addClassification)
);

router.get("/add-inventory", invController.buildInventory);
router.post(
    "/add-inventory",
    validate.invValidate.rules(),
    validate.invValidate.checkData,
    utilities.handleErrors(invController.addInventory)
);
module.exports = router;







