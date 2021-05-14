const db = require("../models");
const Booking = db.booking;

var log4js = require("log4js");

log4js.configure({
  appenders: {
    fileLogs: { type: 'file', filename: '../wandermate.log' },
    console: { type: 'console' },
    out: {
        type: 'stdout',
        layout: {
            type: 'pattern',
            pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m',
        },
    },
  },
  categories: {
    logerror: { appenders: ['fileLogs'], level: 'error' },
    loginfo: { appenders: ['fileLogs'], level: 'debug' },
    default: { appenders: ['console', 'fileLogs'], level: 'trace' }
  }
});
var logger = log4js.getLogger('logerror');
var loggerinfo = log4js.getLogger('loginfo');

// Create and Save a new booking 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_name) {
    logger.error("Content can not be empty!");
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a booking 
  const booking = new Booking(req.body);

  booking
    .save(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while creating the Booking.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Booking."
      });
    });
};

// Retrieve all booking from the database.
exports.findAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;  
  var location = req.query.location; 
  var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } }: {};
  Booking.find({ $and: [ {"userId": new ObjectID(req.userId)}, condition ] } )
    .then(data => {
      loggerinfo.info("Bookings retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving bookings.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookings."
      });
    });
};

// Find a single booking with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found booking with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving booking with id=" + id });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log(id);
  Booking.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update User with id=${id}. Maybe User was not found!`
      });
    } else res.send({ message: "User was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
    console.log(err)
    });
};
