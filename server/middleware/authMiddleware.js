const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) next(ApiError.unauthorized());

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    next(ApiError.unauthorized());
  }
};
