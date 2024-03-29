const { Order } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");

class orderService {
  async create(order) {
    const newOrder = await Order.create(order);

    return newOrder;
  }

  async getAll() {
    const orders = await Order.findAll();

    return orders;
  }

  async getOne(id) {
    const orders = await Order.findOne({ where: id });

    return orders;
  }

  async update(order, id) {
    const { name } = order;
    const updatedOrder = await Order.update({ name }, { where: { id } });

    return updatedOrder;
  }

  async delete(params) {
    const { id } = params;
    if (!(await Order.findOne({ where: { id } }))) throw ApiError.notFound();

    await Order.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new orderService();
