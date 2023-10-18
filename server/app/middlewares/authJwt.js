// https://bezkoder.com/node-js-mongodb-auth-jwt/

const jwt = require("jsonwebtoken");
const config = require("../../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.authSecret, (err, decoded) => {
    if (err) {
      let verifyErrMsg = "Unauthorized!";
      if (err.name === "TokenExpiredError") {
        verifyErrMsg = "Token Expired!";
      }
      return res.status(401).send({
        message: verifyErrMsg,
        data: { token, KEY: "ERR_EXPIRED_TOKEN" },
      });
    }
    req.user_id = decoded.id;
    req.client_id = decoded.client_id;
    req.user_role = decoded.role;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
