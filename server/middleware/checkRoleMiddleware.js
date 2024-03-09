const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; //bearer asicqmomoiq(типо токен)
      if (!token) next(ApiError.unauthorized());

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        next(ApiError.forbidden());
      }

      req.user = decoded;
      next();
    } catch (e) {
      next(ApiError.unauthorized());
    }
  };
};
