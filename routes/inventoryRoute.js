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


// router.get('/', inventoryController.showManagementView);
// router.get('/add-classification', inventoryController.showAddClassificationView);
// router.get('/add-inventory', inventoryController.showAddInventoryView);

router.get("/add-classification", invController.buildClassification);

// router.post("/add-classification", invController.addClassification);
router.post(
    "/add-classification",
    validate.classValidate.rules(),
    validate.classValidate.checkData,
    utilities.handleErrors(invController.addClassification)
);


module.exports = router;







