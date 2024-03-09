module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message = 'Bad Request', errors = []) {
    return new ApiError(400, message);
  }
  static unauthorized(message = 'Not Authorization') {
    return new ApiError(401, message);
  }
  static forbidden(message = 'No Access', errors = []) {
    return new ApiError(403, message);
  }
  static notFound(message = 'Not Found') {
    return new ApiError(404, message);
  }
};
