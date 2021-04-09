const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.itinerary = require("./itinerary.model");

db.ROLES = ["user", "admin", "guide"];

module.exports = db;