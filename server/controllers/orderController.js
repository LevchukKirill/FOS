const ApiError = require("../error/ApiError");
const orderService = require("../providers/orderService");

class orderController {
  async create(req, res, next) {
    try {
      const order = await orderService.create(req.body, req.user);

      return res.json(order);
    } catch (e) {
      console.error(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await orderService.getAll();

      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllByUserId(req, res, next) {
    try {
      const orders = await orderService.getOrderByUserId(req.params.userId);

      return res.json(orders);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const order = await orderService.getOne(req.params.id);

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const updatedOrder = await orderService.update(req.body, req.params.id);

      return res.json(updatedOrder);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      await orderService.delete(req.params);

      return res.send("");
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new orderController();
