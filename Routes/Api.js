const express = require("express");
const res = require("express/lib/response");
const Router = express.Router();
const mysqlConnection = require("../database");
Router.get("/", (req, res) => {
  //Extracting Params
  var num1 = parseInt(req.query.val1);
  var num2 = parseInt(req.query.val2);
  console.log(typeof num1);
  console.log(Number.isNaN(num1));
  //Validations
  if (Number.isInteger(num1) & Number.isInteger(num2) & (num1 > num2)) {
    //Number.isInteger Functions Returns True if its a number and False Otherwise
    //Running Sql Queries we got two if else statments to handle the val1 and val2 entered we could use between function but this is more efficent 
   
    mysqlConnection.query(
      ` SELECT customer_id,sum(transaction_amount),mobile_no,pincode,transaction_date
FROM customerinfo
group by customer_id
having sum(transaction_amount)<${num1} AND sum(transaction_amount)>${num2}

      `,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else if (Number.isInteger(num1) & Number.isInteger(num2) & (num2 > num1)) {

    mysqlConnection.query(
      `SELECT customer_id,sum(transaction_amount),mobile_no,pincode
      FROM customerinfo
      group by customer_id
      having sum(transaction_amount)>${num1} AND sum(transaction_amount)<${num2} `,
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.send("Error Wrong Parameters");
  }
});

module.exports = Router;
