const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../database");
Router.get("/", (req, res) => {
  //Extracting Params
  var state = req.query.state;
  var alphaExp = /^[a-zA-Z]+$/;
  console.log(state);
  console.log(alphaExp.test(state));

  //Validantions

  if (alphaExp.test(state)) {
    //Running Sql Queries

    mysqlConnection.query(
      `SELECT
statepincodes.pincode,
customerinfo.customer_id AS customer,
SUM(customerinfo.transaction_amount) AS total_transactions
FROM customerinfo
INNER JOIN statepincodes ON customerinfo.pincode = statepincodes.pincode
WHERE statepincodes.state = '${state}'
GROUP BY statepincodes.pincode, customerinfo.customer_id
ORDER BY statepincodes.pincode, total_transactions DESC

`,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.send("Error Wrong Parameters Please Enter A String");
  }
});

module.exports = Router;
