const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    const [tokenType, userToken] = req.headers.authorization.split(" ");
    try {
      const tokenData = jwt.verify(userToken, process.env.SECRET_KEY);
      req.user_id = tokenData.user_id;

      if (req.user_id != 1) {
        // if not admin continue
        return next();
      } else {
        return res.status(201).send("you are an admin user");
      }
    } catch (ex) {
      return res.status(401).send(ex);
    }
  }
};
