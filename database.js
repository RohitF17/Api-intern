const mysql = require("mysql2");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpassword",
  database: "intern",
  multipleStatements: true,
});
mysqlConnection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("connection failed ");
    console.log(err);
  }
});

module.exports = mysqlConnection;
