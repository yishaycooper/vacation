const md5 = require("md5");
const db = require("../db/db");

function getByLogin(email, pass, callback) {
  db.performSelect(
    `SELECT * FROM user WHERE email = ? AND pwd = ?`,
    [email, md5(pass)],
    function (err, res) {
      callback(err, res);
    }
  );
}

function isEmailExist(email, callback) {
  db.performSelect(
    `SELECT email FROM user WHERE email = ?`,
    [email],
    function (err, res) {
      if (res.length > 0) {
        // array is empty
        callback(null, true); // user exists
      } else callback(null, false); // user does not exist
    }
  );
}

function add(objModel, callback) {
  isEmailExist(objModel.email, function (err, res) {
    if (!res) {
      db.addUser(
        `INSERT INTO user (email, pwd) VALUES (?, ?)`,
        [objModel.email, md5(objModel.pass)],
        function (err, res) {
          callback(err, res);
        }
      );
    }
    callback(err, res);
  });
}

module.exports.getByLogin = getByLogin;
module.exports.add = add;
