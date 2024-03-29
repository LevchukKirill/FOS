const { User } = require("../models/models");
const userService = require("../providers/userService");
const ApiError = require("../error/ApiError");
const { response } = require("express");
class userController {
  async registration(req, res, next) {
    try {
      const newUser = await userService.registration(req.body);
      return res.json(newUser);
    } catch (e) {
      next(ApiError.notFound(e));
    }
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body);
      return res.json(user);
    } catch (e) {
      next(ApiError.notFound(e));
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
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const user = await userService.getOne(req.id);

      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new userController();
