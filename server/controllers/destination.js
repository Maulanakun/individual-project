const { Destination } = require("../models");

class DestinationClass {
  static async destinationList(req, res, next) {
    try {
      const destination = await Destination.findAll();
      res.json({ destination });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DestinationClass;
