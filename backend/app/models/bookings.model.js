const mongoose = require("mongoose");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    username:String,
    guide:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Itinerary"
        }
    ],
    // location: String,
    start_date: Date,
    end_date: Date,
    review: String,
    rating:Number
  })
);

module.exports = Booking;

