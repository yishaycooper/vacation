const db = require("./../db/db");

function addFollow(objFollow, callback) {
  console.log(objFollow);
  db.addFollow(
    "INSERT INTO user_deals_follow (user_id ,deal_id) VALUES(?, ?)",
    [objFollow.place_id, objFollow.place_user_id],
    function (err, res, fields) {
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

function getPlacesByFollow(callback) {
  // MySQL has an undocumented syntax to sort nulls last. Place a minus sign (-)
  //  before the column name and switch the ASC to DESC
  let sql = `SELECT place_id, place_user_id, description, destination, image, date, price, user_deals_follow.user_id, user_deals_follow.deal_id FROM place
  LEFT JOIN user_deals_follow ON user_deals_follow.user_id = 1 AND user_deals_follow.deal_id = place.place_id
  ORDER BY -user_deals_follow.deal_id DESC`;
  db.getPlacesByFollow(sql, function (err, res) {
    if (err) throw err;

    callback(err, res);
  });
}

module.exports.getPlacesByFollow = getPlacesByFollow;
module.exports.deleteFollow = deleteFollow;
module.exports.addFollow = addFollow;
