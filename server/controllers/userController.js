const { User } = require("../models/models");
const userService = require("../providers/userService");
const ApiError = require("../error/ApiError");

class userController {
  async registration(req, res, next) {
    try {
      const newUser = await userService.registration(req.body);
      res.json(newUser);
    } catch (err) {
      next(ApiError.notFound(err));
    }
  }

  async login(req, res, next) {
    try {
      const token = await userService.login(req.body);

      res.cookie("token", token).send();
    } catch (err) {
      next(ApiError.notFound(err));
    }
  }

  async logout(req, res) {
    res.cookie("token", undefined).send();
  }

  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.cookies.token);

      res.json(user);
    } catch (err) {
      next(ApiError.notFound(err));
    }
  }

  async check(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      res.cookie("token", token, {
        httpOnly: true,
        expire: 43200000,
        secure: true,
      });
      //куки
      // console.log(req.cookies);
      res.send();
    } catch (err) {
      next(ApiError.notFound(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();

      res.json(users);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const user = await userService.getOne(req.id);

      res.json(user);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new userController();
