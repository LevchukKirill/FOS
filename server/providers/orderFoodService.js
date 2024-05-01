const ApiError = require("../error/ApiError");
const { OrderFood } = require("../models/models");

class orderFoodService {
  async create(food) {
    const { orderId, foodId } = food;
    const newOrderFood = await OrderFood.create({ orderId, foodId });

    return newOrderFood;
  }

  async getAll() {
    const ordersFood = await OrderFood.findAll();

    return ordersFood;
  }

  async getAllByOrderId(id) {
    const ordersFood = await OrderFood.findAll({ where: id });

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
