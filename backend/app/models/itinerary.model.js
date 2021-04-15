const mongoose = require("mongoose");

const Itinerary = mongoose.model(
  "Itinerary",
  new mongoose.Schema({
    userId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username:String,
    package_name: String,
    location: String,
    days: Number,
    cost: Number,
    imgUrl:String,
  })
);

module.exports = Itinerary;

