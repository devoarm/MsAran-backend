require("dotenv").config();
var jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    // res.json({ status: "ok", decoded });
  } catch (error) {
    return res.json({ status: "error", message: "not token" });
  }
  return next();
};

module.exports = verifyToken;
