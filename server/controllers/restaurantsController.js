const { Restaurants } = require('../models/models');
const ApiError = require('../error/ApiError');

class typeController {
  async create(req, res) {
    const { name, phone, address } = req.body;
    const restaurant = await Restaurants.create({ name, phone, address });
    return res.json(restaurant);
  }
  async getAll(req, res) {
    const restaurants = await Restaurants.findAll();
    return res.json(restaurants);
  }
}

module.exports = new typeController();
