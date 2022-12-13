const mysql = require("mysql2");
//creating a connection with the database
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root", //The user which is logged into your workbench
  password: "rootpassword", //connect your password based on mysql
  database: "testdata", //Create a schema before hand in mysql and put the data in here
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log("connection failed ");
    console.log(err);
  }
  console.log("connected");
  //Automatically creating a table named customerinfo
  let CreateDefaultTable = `create table if not exists customerinfo(
    transaction_id int not null primary key auto_increment,
    customer_id int not null,
    transaction_amount float not null,
    mobile_no varchar(12) not null,
    pincode  varchar(11)  not null,
    transaction_date datetime not null,
    state varchar(30) not null
   
)`;
  mysqlConnection.query(CreateDefaultTable, function (err, results, fields) {
    //running the query to add the table to the new database be defaul
    if (err) {
      console.log(err.message);
    }
  });
});

module.exports = mysqlConnection;
