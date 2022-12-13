const express = require("express");
const res = require("express/lib/response");
const Router = express.Router();
const mysqlConnection = require("../database");
const moment = require("moment");
//Function to handle the request and responses
Router.post("/", (req, res) => {
  const { customer_id, transaction_amount, mobile_no, pincode, state } =
    req.body;
  console.log(req.body);
  // console.log(typeof mobile_no);
  //console.log(typeof pincode);
  //console.log(typeof(customer_id1));

  console.log(mobile_no);
  console.log(pincode);
  //Validation for few fields Coming from the request body
  if (typeof mobile_no !== "string" || !/^\d+$/.test(mobile_no)) {
    return res.status(400).json({
      error: "Enter A Valid Mobile Number ",
    });
  }
  if (typeof pincode !== "string" || !/^\d+$/.test(pincode)) {
    return res.status(400).json({
      error: "Enter A Valid The Pincode ",
    });
  }
  if (typeof state !== "string" || !!/^\d+$/.test(state)) {
    return res.status(400).json({
      error: "Please Check The State ",
    });
  }
  {
    /*
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
*/
  }
  var transaction_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"); // To create a timestamp for the given record
  //inserting the given data from the request body to the database
  mysqlConnection.query(
    "Insert Into customerinfo SET ?",
    {
      customer_id,
      transaction_amount,
      mobile_no,
      pincode,
      transaction_date,
      state,
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      //taking the last index and returing back the entered data back to the user in JSON format
      mysqlConnection.query(
        "SELECT * FROM customerinfo WHERE transaction_id=?",
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
