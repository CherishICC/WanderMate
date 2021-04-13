const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username:String,
    guide:String,
    package_name: String,
    location: String,
    start_date: String,
    end_date: String,
    review: String,
    rating:Number
  })
);

module.exports = Booking;

