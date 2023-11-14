"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageDestination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImageDestination.belongsTo(models.Destination);
    }
  }
  ImageDestination.init(
    {
      image: DataTypes.STRING,
      DestinationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImageDestination",
    }
  );
  return ImageDestination;
};
