const mongoose = require("mongoose");

const Itinerary = mongoose.model(
  "Itinerary",
  new mongoose.Schema({
    username:String,
    package_name: String,
    location: String,
    days: Number,
    cost: Number,
    userId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  })
);

module.exports = Itinerary;

