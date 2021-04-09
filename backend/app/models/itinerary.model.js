const mongoose = require("mongoose");

const Itinerary = mongoose.model(
  "Itinerary",
  new mongoose.Schema({
    username:String,
    package_name: String,
    location: String,
    days: Number,
    cost: Number
  })
);

module.exports = Itinerary;

