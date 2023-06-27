const utilities = require(".")
const { body, validationResult } = require("express-validator")

const classValidate = {}


classValidate.rules = () => {
    return [
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a name."),
    ]
}

classValidate.checkData = async (req, res, next) => {
    const { classification_name } = req.body;
    let errors = []
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav();
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        flash: req.flash(),
        classification_name,
      });
      return;
    }
    next();
  };


module.exports = {
    classValidate,
};