// const invModel = require("../models/inventory-model")
// const Util = {}
// Util.getNav = async function (req, res, next) {
//   let data = await invModel.getClassifications()
//   let list = "<ul>"
//   list += '<li><a href="/" title="Home page">Home</a></li>'
//   data.rows.forEach((row) => {
//     list += "<li>"
//     list +=
//       '<a href="/inv/type/' +
//       row.classification_id +
//       '" title="See our inventory of ' +
//       row.classification_name +
//       ' vehicles">' +
//       row.classification_name +
//       "</a>"
//     list += "</li>"
//   })
//   list += "</ul>"
//   return list
// }
// Util.buildClassificationGrid = async function(data){
//   let grid
//   if(data.length > 0){
//     grid = '<ul id="inv-display">'
//     data.forEach(vehicle => {
//       grid += '<li>'
//       grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id
//       + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model
//       + 'details"><img src="' + vehicle.inv_thumbnail
//       +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
//       +' on CSE Motors" /></a>'
//       grid += '<div class="namePrice">'
//       grid += '<hr />'
//       grid += '<h2>'
//       grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View '
//       + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
//       + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
//       grid += '</h2>'
//       grid += '<span>$'
//       + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
//       grid += '</div>'
//       grid += '</li>'
//     })
//     grid += '</ul>'
//   } else {
//     grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
//   }
//   return grid
// }
// Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
// module.exports = Util


const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  try {
    let data = await invModel.getClassifications();
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += "<li>";
      list +=
        '<a href="/inv/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>";
      list += "</li>";
    });
    list += "</ul>";
    return list;
  } catch (error) {
    next(error);
  }
};

/* **************************************
 * Build the vehicle detail view HTML
 * ************************************ */
Util.wrapVehicleInfoInHtml = function (vehicle) {
  let html = '<div class="vehicle">';
  html += `<h1>${vehicle.make} ${vehicle.model}</h1>`;
  html += `<img src="${vehicle.image}" alt="Image of ${vehicle.make} ${vehicle.model}" />`;
  html += `<p>Year: ${vehicle.year}</p>`;
  html += `<p>Price: $${vehicle.price.toLocaleString()}</p>`;
  html += `<p>Mileage: ${vehicle.mileage.toLocaleString()}</p>`;
  // Add more vehicle details here
  html += "</div>";
  return html;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;

