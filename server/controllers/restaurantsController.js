const restaurantSerice = require('../providers/restaurantService');
const ApiError = require('../error/ApiError');

class typeController {
  async create(req, res, next) {
    try {
      const createdRestaurant = await restaurantSerice.create(req.body);

      return res.json(createdRestaurant);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const restaurant = await restaurantSerice.getAll();

      return res.json(restaurant);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const updatedRestaurant = await restaurantSerice.update(
        req.body,
        req.params
      );

      return res.json(updatedRestaurant);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const restaurants = await restaurantSerice.delete(req.params);

      return res.send('');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new typeController();
