"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DestinationUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DestinationUser.belongsTo(models.User);
      DestinationUser.belongsTo(models.Destination);
      // define association here
    }
  }
  DestinationUser.init(
    {
      DestinationId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DestinationUser",
    }
  );
  return DestinationUser;
};
