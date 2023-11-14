const { default: axios } = require("axios");
const { Destination, DestinationUser } = require("../models");

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
}
module.exports = DestinationClass;
