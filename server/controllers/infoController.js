const infoService = require('../providers/infoService');
const ApiError = require('../error/ApiError');

class infoController {
  async create(req, res, next) {
    try {
      const info = await infoService.create(req.body);

      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const infos = await infoService.getAll();

      return res.json(infos);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const updatedInfo = await infoService.update(req.body, req.params);

      return res.json(updatedInfo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      await infoService.delete(req.params);

      return res.send('');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new infoController();
