// const invModel = require("../models/inventory-model")
// const utilities = require("../utilities/")

// const invCont = {}
// invCont.buildByClassificationId = async function (req, res, next) {
//   const classification_id = req.params.classificationId
//   const data = await invModel.getInventoryByClassificationId(classification_id)
//   const grid = await utilities.buildClassificationGrid(data)
//   let nav = await utilities.getNav()
//   const className = data[0].classification_name
//   res.render("./inventory/classification", {
//     title: className + " vehicles",
//     nav,
//     grid,
//   })
// }
// module.exports = invCont


// tried this Not working=======================================
// const invModel = require("../models/inventory-model");
// const utilities = require("../utilities/");

// const invCont = {};

// invCont.buildByClassificationId = async function (req, res, next) {
//   try {
//     const classificationId = req.params.classificationId;
//     const data = await invModel.getInventoryByClassificationId(classificationId);
//     const vehicle = data[0];
//     const vehicleHtml = utilities.wrapVehicleInfoInHtml(vehicle);
//     let nav = await utilities.getNav();
//     const className = data[0].classification_name;
//     res.render("./inventory/detail", {
//       title: `${vehicle.make} ${vehicle.model}`,
//       nav,
//       vehicleHtml,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = invCont;

const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {};

// Build inventory by classification view
invController.buildByClassificationId = async function (req, res, next) {
  // Implementation for building inventory by classification view
  // ...
};

// Build inventory item detail view
invController.buildDetail = async function (req, res, next) {
  try {
    const inventoryId = req.params.inventoryId;
    const inventoryItem = await invModel.getInventoryById(inventoryId);
    const vehicleHtml = utilities.wrapVehicleInfoInHtml(inventoryItem);
    let nav = await utilities.getNav();
    res.render("./inventory/detail", {
      title: `${inventoryItem.make} ${inventoryItem.model}`,
      nav,
      vehicleHtml,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = invController;

