const { Order, User, OrderFood } = require("../models/models");
const ApiError = require("../error/ApiError");

class orderService {
  async create(data, user) {
    const cost = Object.values(data.foods).reduce((accum, food) => {
      return accum + food.data.price * food.amount;
    }, 0);
    // console.log(data)
    const newOrder = await Order.create({
      userId: user.id,
      restaurantId: data.restaurantId,
      cost,
    });
    await Promise.all(
      Object.values(data.foods).map(async (item) => {
        // console.log((item) + " " + item.data, item.amount);
        // console.log(basket);
        await OrderFood.create({
          orderId: newOrder.id,
          foodId: item.data.id,
          amount: item.amount,
        });
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
    const order = await Order.findOne({ where: { id } });

    return order;
  }

  async update(order, id) {
    const { cost, status } = order;
    const updatedOrder = await Order.update(
      { cost, status },
      { where: { id } },
    );

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
