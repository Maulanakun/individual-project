const { compHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const imagekit = require("../middlewares/imagekit");
const { User } = require("../models");

class UserClass {
  static async getUser(req, res, next) {
    try {
      let data = await User.findOne({
        where: {
          email: req.userInfo.email,
        },
      });
      res.status(200).json({
        email: data.email,
        pfp: data.pfp,
        name: data.name,
      });
    } catch (error) {
      next(error);
    }
  }
  static async regist(req, res, next) {
    try {
      const { name, email, phoneNumber, password } = req.body;
      const base64 = req.file.buffer.toString("base64");

      let input = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });
      let response = await User.create({
        name,
        email,
        phoneNumber,
        pfp: input.url,
        password,
      });
      res.status(200).json({
        name: response.name,
        email: response.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error("please Input email");
      }
      if (!password) {
        throw new Error("please Input password");
      }
      let data = await User.findOne({
        where: {
          email,
        },
      });

      if (!data) {
        throw new Error("INVALID EMAIL/PASSWORD");
      }
      let valid = compHash(password, data.password);
      if (!valid) {
        throw new Error("INVALID EMAIL/PASSWORD");
      }
      const token = signToken({ id: data.id, name: data.name, email });
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = UserClass;
