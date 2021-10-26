const express = require("express");

const userRepository = require("../repositories/user.repository");

const router = express.Router();

router.post("/markfollow/:placeid", function (req, res) {
  const { placeid } = req.params;

  userRepository.addFollow(
    {
      place_id: 1,
      place_user_id: placeid,
    },
    function (err, result) {
      if (err) throw err;
      return res.status(201).send("inserted follow");
    }
  );
});

router.post("/removefollow/:placeid", function (req, res) {
  const { placeid } = req.params;

  userRepository.deleteFollow(placeid, function (err, result) {
    if (err) throw err;
    return res.status(201).send("deleted follow");
  });
});

router.get("/img", function (req, res) {
  res.sendFile(path.join(__dirname, "uploads", req.query.i));
  // console.log(req.url);
});

router.get("/getplaces", function (req, res) {
  userRepository.getPlacesByFollow(function (err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = router;
