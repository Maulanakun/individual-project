const express = require("express");
const auth = require("../middlewares/authn");
const DestinationClass = require("../controllers/destination");
const middlewareUpload = require("../middlewares/multer");
const destination = express.Router();

destination.get("/destination", DestinationClass.destinationList);
destination.get("/destination/search", DestinationClass.searchDestination);
destination.post("/destination", DestinationClass.addDestinationFormApi);
destination.get("/destinationuser", DestinationClass.destinationUser);
destination.get(
  "/destination/:destinationId",
  DestinationClass.destinationDetail
);
destination.delete(
  "/destinationuser/:desinationuserid",
  DestinationClass.deleteDestinationUser
);
destination.put(
  "/destinationuser/:destinationuserid",
  middlewareUpload,
  DestinationClass.UpdateImageDestination
);
destination.post(
  "/destination/:destinationId",
  DestinationClass.userDestination
);

module.exports = destination;
