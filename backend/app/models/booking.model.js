const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    userId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    packageId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
      required: true
    },
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

