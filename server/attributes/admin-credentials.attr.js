const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const [tokenType, userToken] = req.headers.authorization.split(" ");

  try {
    const tokenData = jwt.verify(userToken, process.env.SECRET_KEY);
    req.user_id = tokenData.user_id;

    if (req.user_id < 2) {
      // if admin continue

      return next();
    } else {
      return res.status(201).send("you are an admin user");
    }
  } catch (ex) {
    return res.status(401).send(ex);
  }
};
