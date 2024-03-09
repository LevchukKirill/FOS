const ApiError = require('../error/ApiError');
const { FoodInfo } = require('../models/models');

class infoService {
  async create(info) {
    const newInfo = await FoodInfo.create(info);

    return newInfo;
  }

  async getAll() {
    const infos = await FoodInfo.findAll();

    return infos;
  }

  async update(info, id) {
    if (!(await FoodInfo.findOne({ where: { id } }))) throw ApiError.notFound();
    const { description } = info;
    const updatedInfo = await FoodInfo.update(
      { description },
      { where: { id } }
    );

    return updatedInfo;
  }

  async delete(params) {
    const { id } = params;
    if (!(await FoodInfo.findOne({ where: { id } }))) throw ApiError.notFound();
    await FoodInfo.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new infoService();
