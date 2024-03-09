const ApiError = require('../error/ApiError');
const { Restaurant, FoodInfo } = require('../models/models');

class restaurantService {
  async create(restaurant) {
    const { name, address, phone } = restaurant;
    const newRestaurant = await Restaurant.create({ name, address, phone });

    return newRestaurant;
  }

  async getAll() {
    const restaurants = await Restaurant.findAll();

    return restaurants;
  }

  async update(restaurant, id) {
    if (!(await Restaurant.findOne({ where: { id } })))
      throw ApiError.notFound();
    const { name, address, phone } = restaurant;
    const updatedRestaurant = await Restaurant.update(
      { name, address, phone },
      { where: { id } }
    );

    return updatedRestaurant;
  }

  async delete(params) {
    const { id } = params;
    if (!(await Restaurant.findOne({ where: { id } })))
      throw ApiError.notFound();
    await Restaurant.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new restaurantService();
