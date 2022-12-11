const express = require("express");

const bodyParser = require("body-parser");
const CustomerRoute = require("./Routes/Api");
const topCustomers = require("./Routes/top_Customers");
const createCustomer = require("./Routes/createCustomer");
const mysql = require("mysql2");
const mysqlConnection = require("./database");
const app = express();

app.use(bodyParser.json());
app.use("/createCustomer", createCustomer); // API 1 To Create An Entry In The DataBase
app.use("/displayCustomer", CustomerRoute); //API 2 Where It accepts two parameters and returns the appriopriate records
app.use("/displayTopcustomers", topCustomers); // API Where Top 5 customers from the particular Pincode are displayed

app.get("/", (req, res) => {
  res.send("Main API Page");
});

app.listen(3000);
