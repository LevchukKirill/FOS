const { FoodInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class typeController {
  async create(req, res) {
    const { description } = req.body;
    const info = await FoodInfo.create({ description });
    return res.json(info);
  }
  async getAll(req, res) {
    const infos = await Type.findAll();
    return res.json(infos);
  }
}

module.exports = new typeController();
