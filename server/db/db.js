const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "vacation",
  // multipleStatements: true,
});

connection.connect(function (err) {
  if (err) console.log(err);
});

// AUTH
function addUser(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

function performSelect(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

// ADMIN
function getPlaces(query, callback) {
  connection.query(query, function (err, results) {
    callback(err, results);
  });
}

function deletePlace(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

function addPlace(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

function updatePlace(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

// FOLLOW
function addFollow(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

function deleteFollow(query, values, callback) {
  connection.query(query, values, function (err, results) {
    callback(err, results);
  });
}

function getPlacesByFollow(query, callback) {
  connection.query(query, function (err, results) {
    callback(err, results);
  });
}

module.exports = {
  performSelect,
  addUser,
  getPlaces,
  deletePlace,
  addPlace,
  updatePlace,
  addFollow,
  deleteFollow,
  getPlacesByFollow,
};
