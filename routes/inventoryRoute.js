// const express = require("express")
// const router = new express.Router()
// const invController = require("../controllers/invController")
// router.get("/type/:classificationId", invController.buildByClassificationId);
// router.get("/detail/:inventoryId", invController.buildDetail);
// module.exports = router;

const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

// Route to build inventory by classification view
router.get('/type/:classificationId', invController.buildByClassificationId);
router.get('/detail/:inventoryId', invController.buildDetail);

module.exports = router;


