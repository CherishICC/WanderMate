const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username:String,
    guide:String,
    package_name: String,
    location: String,
    start_date: Date,
    end_date: Date,
    review: String,
    rating:Number
  })
);

module.exports = Booking;

