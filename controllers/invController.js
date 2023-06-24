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
  console.log(data)
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
  res.render('inventory/management', {
    title: 'Management',
    nav,
    flash: req.flash(),
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



module.exports = invCont
