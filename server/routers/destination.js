const express = require("express");
const auth = require("../middlewares/authn");
const DestinationClass = require("../controllers/destination");
const destination = express.Router();

destination.get("/destination", DestinationClass.destinationList);
destination.get("/destination/search", DestinationClass.searchDestination);
destination.post("/destination", DestinationClass.addDestinationFormApi);

module.exports = destination;
