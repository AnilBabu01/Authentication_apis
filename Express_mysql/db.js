var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeapp",
});

const connectoMysql = () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Myqsl successfully connected ");
    connection.query("SELECT * FROM customers WHERE address = 'Highway 88'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
  });
};
module.exports = connectoMysql;
