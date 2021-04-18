const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    userId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    from: String,
    to: String,
    msg: String
  })
);

module.exports = Chat;

