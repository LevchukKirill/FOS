const { Order, User, OrderFood } = require("../models/models");
const ApiError = require("../error/ApiError");
const { where } = require("sequelize");
const userService = require("../providers/userService");

class orderService {
  async create(basket, user) {
    const newOrder = await Order.create({ userId: user.id });
    await Promise.all(
      Object.values(basket).map(async (item) => {
        console.log(item.data.id + " " + user.id);
        await OrderFood.create({ orderId: newOrder.id, foodId: item.data.id });
      }),
    );

    return newOrder;
  }

  async getAll() {
    const orders = await Order.findAll();

    return orders;
  }

  async getOrderByUserId(userId) {
    const ordersById = await Order.findAll({ where: userId });

    return ordersById;
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
