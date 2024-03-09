const uuid = require('uuid');
const path = require('path');
const { Food } = require('../models/models');
const ApiError = require('../error/ApiError');

class foodService {
  async create(food, picture) {
    // console.log(picture);
    const { name, price, foodInfo, restaurantId, typeId } = food;
    const { img } = picture;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const { id } = await Food.create(
      {
        name,
        price,
        food_info: { description: foodInfo },
        restaurantId,
        typeId,
        img: fileName,
      },
      { include: [Food.FoodInfo] }
    );

    return this.getOne(id);
  }

  async getOne(id) {
    const food = await Food.findOne({
      where: { id },
      include: [Food.FoodInfo, Food.Type],
      attributes: { exclude: ['foodInfoId'] },
    });
    if (!food) throw ApiError.notFound();

    return food;
  }

  async getAll(params) {
    const { typeId, restaurantId, limit = 8, page = 1 } = params;

    let offset = page * limit - limit;
    let foods;
    if (!typeId && !restaurantId) {
      foods = await Food.findAndCountAll({ limit, offset });
    }
    if (!typeId && restaurantId) {
      foods = await Food.findAndCountAll({
        where: { restaurantId },
        limit,
        offset,
      });
    }
    if (typeId && !restaurantId) {
      foods = await Food.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (typeId && restaurantId) {
      foods = await Food.findAndCountAll({
        where: { typeId, restaurantId },
        limit,
        offset,
      });
    }

    return foods;
  }
  async update(food, id) {
    const { name, price, foodInfoId, restaurantId, typeId } = food;
    const updatedFood = await Food.update(
      {
        name,
        price,
        foodInfoId,
        restaurantId,
        typeId,
      },
      { where: { id } }
    );

    return updatedFood;
  }
  async delete(id) {
    await this.getOne(id);
    await Food.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new foodService();
