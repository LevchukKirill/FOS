const uuid = require('uuid');
const path = require('path');
const { Food } = require('../models/models');
const ApiError = require('../error/ApiError');

class foodController {
  async create(req, res) {
    try {
    } catch (e) {
      ApiError.badRequest(e.message);
    }
    const { name, price, infoId, restaurantsId, typeId } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));

    const food = await Food.create({
      name,
      price,
      infoId,
      restaurantsId,
      typeId,
      img: fileName,
    });
    return res.json(food);
  }

  async getOne(req, res) {}

  async getAll(req, res) {}
}

module.exports = new foodController();
