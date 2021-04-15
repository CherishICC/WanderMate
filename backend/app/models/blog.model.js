const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema({
    username:String,
    location: String,
    experience: String
  })
);

module.exports = Blog;

