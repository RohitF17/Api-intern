const express = require("express");
const res = require("express/lib/response");
const Router = express.Router();
const mysqlConnection = require("../database");
const moment = require("moment");

Router.post("/", (req, res) => {
  const { customer_id, transaction_amount, mobile_no, pincode } = req.body;
  console.log(req.body);
  //console.log(typeof(customer_id1));
  //validations
  {/*
 if (typeof customer_id1 === 'Number') {
   var customer_id =customer_id1;
 } else {
   res.send('Incorrect Type for CustomerId');
 }
 if (typeof transaction_amount1 === 'number') {
   var transaction_amount = transaction_amount1;
 } else {
    res.send('Incorrect type of Transcation_amount');
 }
 if (typeof mobile_no1 === 'string' && mobile_no1.length === 10 && !isNaN(mobile_no1)) {
   var mobile_no=mobile_no1;
 } else {
   res.send("Incorrect Mobile Number Please Check Again")
 }
 
 if (typeof(pincode1) === 'string' && pincode1.length === 6 && !isNaN(pincode1)) {
   var pincode=pincode1;
 } else {
   res.send("Incorrect Pincode Please Check Again");
 } 
*/}
  var transcation_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  mysqlConnection.query(
    "Insert Into customerinfo SET ?",
    {
      customer_id,
      transaction_amount,
      mobile_no,
      pincode,
      transcation_date,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      mysqlConnection.query(
        "SELECT * FROM customerinfo WHERE customer_id=?",
        [result.insertId],
        (error, results) => {
          if (error) {
            return res.status(500).json({ error });
          }
          return res.json({ row: results[0] });
        }
      );
    }
  );
});

module.exports = Router;
