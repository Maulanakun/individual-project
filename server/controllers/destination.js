const { default: axios } = require("axios");
const { Destination, DestinationUser } = require("../models");
const imagekit = require("../middlewares/imagekit");

class DestinationClass {
  static async destinationList(req, res, next) {
    try {
      const destination = await Destination.findAll();
      res.json({ destination });
    } catch (error) {
      next(error);
    }
  }
  static async searchDestination(req, res, next) {
    try {
      const { search } = req.body;

      let result = await axios.get(
        `https://api.goapi.io/places?api_key=2dbe9fab-f71b-534b-0f68-cd98df02&search=${search}`
      );
      res.status(200).json(result.data.data.results);
    } catch (error) {
      next(error);
    }
  }
  static async addDestinationFormApi(req, res, next) {
    try {
      const { tujuan, budget, imgUrl } = req.body;
      let destination = await Destination.create({
        tujuan,
        budget,
        imgUrl,
      });
      let destinationUser = await DestinationUser.create({
        DestinationId: destination.id,
        UserId: req.userInfo.id,
      });
      res.status(201).json({
        destination,
        destinationUser,
      });
    } catch (error) {
      next(error);
    }
  }
  static async destinationUser(req, res, next) {
    try {
      let destinationUser = await DestinationUser.findAll({
        where: {
          UserId: req.userInfo.id,
        },
        include: Destination,
      });
      res.status(200).json({ destinationUser });
    } catch (error) {
      next(error);
    }
  }
  static async deleteDestinationUser(req, res, next) {
    try {
      const { desinationuserid } = req.params;
      let data = await DestinationUser.findOne({
        where: {
          id: desinationuserid,
        },
        include: Destination,
      });
      let name = data.Destination.tujuan;
      await data.destroy({
        where: {
          id: desinationuserid,
        },
      });
      res.status(200).json(`success delete destination user to ${name}`);
    } catch (error) {
      next(error);
    }
  }
  static async UpdateImageDestination(req, res, next) {
    console.log(req.params);
    try {
      const { destinationuserid } = req.params;
      let data = await DestinationUser.findOne({
        where: {
          id: destinationuserid,
        },
        include: Destination,
      });
      let name = data.Destination.tujuan;
      const base64 = req.file.buffer.toString("base64");
      let input = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });
      await Destination.update(
        {
          imgUrl: input.url,
        },
        {
          where: {
            id: data.DestinationId,
          },
        }
      );
      res.status(200).json(`success update image destination user to ${name}`);
    } catch (error) {
      next(error);
    }
  }
  static async destinationDetail(req, res, next) {
    const { destinationId } = req.params;
    console.log(req.params);
    try {
      let data = await Destination.findByPk(destinationId);
      res.status(200).json({ Detail: data });
    } catch (error) {}
  }
  static async userDestination(req, res, next) {
    try {
      console.log(req.params, req.userInfo);
      const { destinationId } = req.params;
      const { id } = req.userInfo;
      let data = await DestinationUser.create({
        DestinationId: destinationId,
        UserId: id,
      });
      res.status(201).json({
        message: "success add",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DestinationClass;
