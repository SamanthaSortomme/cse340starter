// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:carId", invController.buildByCarId);
router.get("/", invController.viewInv);



// router.get('/', inventoryController.showManagementView);
// router.get('/add-classification', inventoryController.showAddClassificationView);
// router.get('/add-inventory', inventoryController.showAddInventoryView);

module.exports = router;







