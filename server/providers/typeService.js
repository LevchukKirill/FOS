const ApiError = require('../error/ApiError');
const { Type } = require('../models/models');

class typeService {
  async create(type) {
    const newType = await Type.create(type);

    return newType;
  }

  async getAll() {
    const types = await Type.findAll();

    return types;
  }

  async update(type, id) {
    const { name } = type;
    const updatedType = await Type.update({ name }, { where: { id } });

    return updatedType;
  }

  async delete(params) {
    const { id } = params;
    if (!(await Type.findOne({ where: { id } }))) throw ApiError.notFound();

    await Type.destroy({ where: { id } });

    console.log(`Удален элемент с id = ${id}`);
  }
}

module.exports = new typeService();
