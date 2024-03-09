const ApiError = require('../error/ApiError');
const typeService = require('../providers/typeService');

class typeController {
  async create(req, res, next) {
    try {
      const type = await typeService.create(req.body);

      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await typeService.getAll();

      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    t;
    try {
      const updatedType = await typeService.update(req.body, req.params);

      return res.json(updatedType);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      await typeService.delete(req.params);

      return res.send('');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new typeController();
