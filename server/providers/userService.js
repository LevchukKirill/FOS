const { User, Order } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

class userService {
  generateJwt(id, name, phone, role) {
    return jwt.sign({ id, name, phone, role }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });
  }
  parseJwt(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return reject(ApiError.unauthorized());
        }
        this.getOne(decoded.id)
          .then(resolve)
          .catch(() => {
            reject(ApiError.unauthorized());
          });
      });
    });
  }

  async registration(form) {
    console.log(form);
    const { name, password, phone, address, role } = form;

    if (!name) this.name = phone;
    else this.name = name;

    if (!password || !phone) throw ApiError.notFound("Неккоректный ввод");

    const existedUser = await User.findOne({ where: { phone } });

    if (existedUser)
      throw ApiError.forbidden(
        "Пользователь с таким номером телефона уже существует",
      );

    const hashPassword = await bcrypt.hash(password, 4);

    const user = await User.create({
      name: this.name,
      password: hashPassword,
      phone,
      role,
      address,
    });

    const order = await Order.create({ userId: user.id });

    const token = this.generateJwt(user.id, user.name, user.phone, user.role);
    console.log("loh");
    return { token };
  }

  async login(form) {
    console.log(form);
    const { phone, password } = form;
    const user = await User.findOne({ where: { phone } });
    if (!user) throw ApiError.notFound();

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) throw ApiError.notFound();

    const token = this.generateJwt(user.id, user.name, user.phone, user.role);

    return token;
  }

  async getUser(token) {
    return this.parseJwt(token);
  }

  async getAll() {
    const users = await User.findAll();
    if (!users) throw ApiError.notFound();

    return users;
  }

  async getOne(id) {
    const user = await User.findOne({ where: id });
    if (!user) throw ApiError.notFound();

    return user;
  }
}

module.exports = new userService();
