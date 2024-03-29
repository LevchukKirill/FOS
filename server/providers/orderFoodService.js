const ApiError = require("../error/ApiError");
const { OrderFood } = require("../models/models");

class orderFoodService {
  async create(type) {
    const newOrderFood = await OrderFood.create(type);

    return newOrderFood;
  }

  async getAll() {
    const ordersFood = await OrderFood.findAll();

    return ordersFood;
  }

  async update(type, id) {
    const { name } = type;
    const updatedOrderFood = await OrderFood.update(
      { name },
      { where: { id } },
    );

    return updatedOrderFood;
  }

  async delete(params) {
    const { id } = params;
    if (!(await OrderFood.findOne({ where: { id } })))
      throw ApiError.notFound();

    await OrderFood.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new orderFoodService();
