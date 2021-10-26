const db = require("../db/db");

function addPlace(objPlace, callback) {
  db.addPlace(
    `INSERT INTO place (place_user_id ,description, destination, image, date, price)
    VALUES(?, ?, ?, ?, ?, ?)`,
    [
      objPlace.place_user_id,
      objPlace.description,
      objPlace.destination,
      objPlace.image,
      objPlace.date,
      objPlace.place,
    ],
    function (err, res) {
      if (err) throw err;
      callback(err, res);
    }
  );
}

function updatePlace(objPlace, callback) {
  db.updatePlace(
    `UPDATE place SET description = ?, destination = ?, image = ?, date = ?, price = ? WHERE place_id = ?`,
    [
      objPlace.description,
      objPlace.destination,
      objPlace.image,
      objPlace.date,
      objPlace.place,
      objPlace.place_id,
    ],
    function (err, res, fields) {
      if (err) throw err;
      callback(err, res);
    }
  );
}

function getPlaces(callback) {
  db.getPlaces("SELECT * FROM place", function (err, res) {
    if (res.length > 0) {
      callback(err, res);
    } else callback(err, res);
  });
}

function deletePlace(id, callback) {
  db.deletePlace(
    `DELETE FROM place WHERE place_id = ?`,
    id,
    function (err, res) {
      if (err) throw err;
      callback(err, res);
    }
  );
}

function deleteFollow(id, callback) {
  db.deleteFollow(
    `DELETE FROM user_deals_follow WHERE deal_id = ?`,
    id,
    function (err, res) {
      if (err) throw err;
      callback(err, res);
    }
  );
}

module.exports.getPlaces = getPlaces;
module.exports.addPlace = addPlace;
module.exports.updatePlace = updatePlace;
module.exports.deletePlace = deletePlace;
module.exports.deleteFollow = deleteFollow;

// function getPlaceId(objPlace, callback) {
//   db.addPlace(
//     `INSERT INTO place (place_user_id ,description, destination, image, date, price)
//     VALUES(?, ?, ?, ?, ?, ?)`,
//     [
//       objPlace.place_user_id,
//       objPlace.description,
//       objPlace.destination,
//       objPlace.image,
//       objPlace.date,
//       objPlace.place,
//     ],
//     function (err, res) {
//       if (err) throw err;
//       callback(err, res);
//     }
//   );
// }

// function addPlace(objPlace, callback) {
//   getPlaceId(objPlace, function (err, data) {
//     db.addFollow(
//       "INSERT INTO user_deals_follow (user_id ,deal_id) VALUES(?, ?)",
//       [objPlace.place_user_id, data.insertId.toString()],
//       function (err, res, fields) {
//         if (err) throw err;
//         callback(err, res);
//       }
//     );
//   });
// }
