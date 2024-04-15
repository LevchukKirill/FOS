const foodService = require("../providers/foodService");
const ApiError = require("../error/ApiError");

class foodController {
  async create(req, res, next) {
    try {
      const food = await foodService.create(req.body, req.files);

      return res.json(food);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const food = await foodService.getOne(req.params.id);

      return res.json(food);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let foods = await foodService.getAll(req.query);

      return res.json(foods);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getByType(req, res, next) {
    try {
      let foods = await foodService.getByType(req.params.typeId);

      return res.json(foods);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const food = await foodService.update(req.body, req.params.id);

      return res.json(food);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      await foodService.delete(req.params.id);

      return res.send("");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new foodController();
