const express = require("express");
const jwt = require("jsonwebtoken");

const authRepository = require("./../repositories/auth.repository");

const router = express.Router();

router.post("/login", function (req, res) {
  const { user, pass } = req.body;
  authRepository.getByLogin(user, pass, function (err, theUser) {
    if (theUser) {
      const token = jwt.sign(
        {
          user_id: theUser[0].user_id,
          email: theUser[0].email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "5h",
        }
      );

      return res.send(token);
    } else {
      res.status(401).send();
    }
  });
});

router.post("/register", function (req, res) {
  const { user, pass } = req.body;
  authRepository.add(
    {
      email: user,
      pass: pass,
    },
    function (err, success) {
      if (err || !success) {
        // user does not exist
        res.status(201).send();
      }
      return res.status(400).send();
    }
  );
});

module.exports = router;
