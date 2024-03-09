const { User, Order } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const generateJwt = (id, name, phone, role) => {
  return jwt.sign({ id, name, phone, role }, process.env.SECRET_KEY, {
    expiresIn: '12h',
  });
};

class userService {
  async registration(form) {
    const { name, password, phone, address, role } = form;
    if (!name || !password || !phone)
      throw ApiError.notFound('Неккоректный ввод');

    const existedUser = await User.findOne({ where: { phone } });
    if (existedUser)
      throw ApiError.forbidden(
        'Пользователь с таким номером телефона уже существует'
      );

    const hashPassword = await bcrypt.hash(password, 4);

    const user = await User.create({
      name,
      password: hashPassword,
      phone,
      role,
      address,
    });

    const order = await Order.create({ userId: user.id });

    const token = generateJwt(user.id, user.name, user.phone, user.role);

    return { token };
  }

  async login(form) {
    const { phone, password } = form;
    const user = await User.findOne({ where: { phone } });
    if (!user) throw ApiError.notFound();

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) throw ApiError.notFound();

    const token = generateJwt(user.id, user.name, user.phone, user.role);
    return { token };
  }
}

module.exports = new userService();
