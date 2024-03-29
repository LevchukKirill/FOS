const ApiError = require("../error/ApiError");
const orderFoodService = require("../providers/orderFoodService");

class orderFoodController {
  async create(req, res, next) {
    try {
      const type = await orderFoodService.create(req.body);

      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await orderFoodService.getAll();

      return res.json(types);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    t;
    try {
      const updatedType = await orderFoodService.update(req.body, req.params);

      return res.json(updatedType);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      await orderFoodService.delete(req.params);

      return res.send("");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new orderFoodController();
