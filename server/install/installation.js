const mysql = require("mysql");
fs = require("fs");

fs.readFile("./database.sql", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  const dbNAme = "vacation";
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    multipleStatements: true,
  });
  connection.query(
    `DROP DATABASE IF EXISTS ${dbNAme}; CREATE DATABASE ${dbNAme} CHARACTER SET utf8 COLLATE utf8_bin`,
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
      connection.changeUser({ database: dbNAme }, function (err) {
        if (err) throw err;
        connection.query(data, function (err, res) {
          console.log(err || res);
          process.exit(0);
        });
      });
    }
  );
});
