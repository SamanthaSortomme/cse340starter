const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByCarId = async function (req, res, next) {
  const carId = req.params.carId
  const data = await invModel.getInventoryByCarId(carId)
  // console.log(data)
  const buildCar = await utilities.buildCar(data)
  let nav = await utilities.getNav()
  const makeMod = data.inv_make + data.inv_model
  res.render("./inventory/detail", {
    title: makeMod + " vehicles",
    nav,
    buildCar,
  //   grid,
  })
}

// https://blainerobertson.github.io/340-js/assignments/assign4.html

invCont.viewInv = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classification = await invModel.getClassifications();
  res.render('inventory/management', {
    title: 'Management',
    nav,
    flash: req.flash(),
    classification,
    errors: null,
  });
}

invCont.buildClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render('inventory/add-classification', {
    title: 'Add Classification',
    nav,
    flash: req.flash(),
    errors: null,
  });
}

invCont.addClassification = async function (req, res, next) {
  const classificationName = req.body.classification_name
  let classification = await invModel.getClassifications();
  try {
    const data = await invModel.insertClassification(classificationName)
    if (data) {
      let nav = await utilities.getNav()
      req.flash(
        "notice",
        `Congratulations, you did it! Look in the Nav bar.`
      )
      res.status(201).render("inventory/management", {
        title: 'Management',
        nav,
        classification,
        flash: req.flash(),
        errors: null,
      });
    } else {
      req.flash("notice", "Sorry, you did not make a new classification.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        flash: req.flash(),
        errors: null,
      })
    }
  } catch (error) {
    console.error("addClassification error: ", error);
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification - Error",
      nav,
      flash: req.flash(),
      errors: null,
    });
  }
};

invCont.buildInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classification = await invModel.getClassifications();
  let inventoryList = await utilities.getInv();
  res.render('inventory/add-inventory', {
    title: 'Add Inventory',
    nav,
    classification,
    inventoryList,
    flash: req.flash(),
    errors: null,
  });
  // console.log(classification)
}
// invCont.buildInventory = async function (req, res, next) {
//   let nav;
//   try {
//     nav = await utilities.getNav();
//     const classifications = await invModel.getClassifications();
//     const inventoryList = await Util.getInv();
//     res.render('inventory/add-inventory', {
//       title: 'Add Inventory',
//       nav,
//       classifications: classifications,
//       inventoryList: inventoryList,
//       flash: req.flash(),
//       errors: null,
//     });
//   } catch (error) {
//     console.error("buildInventory error:", error);
//     req.flash("notice", 'Sorry, there was an error processing the request.')
//     res.status(500).render("inventory/add-inventory", {
//       title: "Add Inventory - Error",
//       nav,
//       flash: req.flash(),
//       errors: null,
//     });
//   }
// }



invCont.addInventory = async function (req, res, next) {
  // const inventoryName = req.body.inventory_name
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let nav = await utilities.getNav()
  let classification = await invModel.getClassifications();
  try {
    const data = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    if (data) {
      req.flash(
        "notice",
        `Congratulations, you did it!`
      )
      res.status(201).render("inventory/management", {
        title: 'Management',
        nav,
        classification,
        flash: req.flash(),
        errors: null,
      });
    } else {
      req.flash("notice", "Sorry, you did not make a new inventory.")
      res.status(501).render("inventory/add-inventory", {
        title: "Inventory",
        nav,
        classification,
        inventoryList,
        inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,
        flash: req.flash(),
        errors: null,
      })
    }
  } catch (error) {
    console.error("addInventory error: ", error);
    req.flash("notice", 'Sorry, there was an error processing the inventory.')
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory - Error",
      nav,
      classification,
      inventoryList,
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,
      flash: req.flash(),
      errors: null,
    });
  }
};





/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
edit inventory
 * ************************** */
invCont.editInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id); // Collect and store the inventory_id as an integer
// console.log(inv_id)
  let nav = await utilities.getNav();
  const itemData = await invModel.getInventoryByCarId(inv_id)
  const classification = await invModel.getClassifications();
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;

  res.status(201).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    flash: req.flash(),
    classification,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  });

};



invCont.updateInventory = async function (req, res, next) {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let nav = await utilities.getNav()
  let classification = await invModel.getClassifications();
    const updateResult = await invModel.updateInventory(
       inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,inv_id)

    if (updateResult){
      const itemName = updateResult.inv_make + " " + updateResult.inv_model
      req.flash("notice", `The ${itemName} was successfully updated.`)
      res.redirect("/inv/")
    }
    else {
      const classificationSelect = await utilities.buildClassificationList(classification_id)
      const itemName = `${inv_make} ${inv_model}`
      req.flash("notice", "Sorry, the insert failed.")
      res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classification,
      inventoryList,
      inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,
      flash: req.flash(),
      errors: null,
      })
    }
};



module.exports = invCont
