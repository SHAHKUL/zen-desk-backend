require("dotenv").config();
const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
  if (req.headers.auth) {
    let decode = jwt.verify(req.headers.auth, process.env.key);
    if (decode) {
      req.abd = decode.id;
      next();
    } else {
      res.status(401).json({ message: "it is nto crt token" });
    }
  } else {
    res.status(401).json({ message: "UNAUTUORIZED" });
  }
}

module.exports = authenticate;
