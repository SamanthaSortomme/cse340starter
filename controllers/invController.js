const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {};

invController.buildByClassificationId = async function (req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    const inventoryItems = await invModel.getInventoryByClassificationId(classificationId);
    let nav = await utilities.getNav();
    res.render("./inventory/classification", {
      title: "Inventory by Classification",
      nav,
      inventoryItems,
    });
  } catch (error) {
    next(error);
  }
};

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
