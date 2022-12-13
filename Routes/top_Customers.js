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
      `
      SELECT  pincode, customer_id, SUM(transaction_amount) as total_transaction_amount
      FROM customerinfo
      WHERE state = '${state}'
      GROUP BY pincode, customer_id
       ORDER BY pincode,total_transaction_amount
      LIMIT 5;
      
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
