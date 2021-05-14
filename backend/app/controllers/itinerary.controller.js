const db = require("../models");
const Itinerary = db.itinerary;

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

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_name) {
    logger.error("Content can not be empty!");
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const itinerary = new Itinerary(req.body);

  itinerary
    .save(itinerary)
    .then(data => {
      loggerinfo.info("Package created.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while creating the Package.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Package."
      });
    });
};

exports.findAllpackages = (req, res) => {
  var location = req.query.location; 
  var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } }: {};
  Itinerary.find(condition)
    .then(data => {
      loggerinfo.info("Packages retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving itineraries.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving itineraries."
      });
    });
};

// Retrieve all itineraries from the database.
exports.findAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID; 
  const package_name = req.query.package_name;
  var condition = package_name ? { package_name: { $regex: new RegExp(package_name), $options: "i" } } : {};
  Itinerary.find({ $and: [ {"userId": new ObjectID(req.userId)}, condition ] })
    .then(data => {
      loggerinfo.info("Packages retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving itineraries.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving itineraries."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Itinerary.findById(id)
    .then(data => {
      if (!data){
        logger.error("Not found User with id " + id);
        res.status(404).send({ message: "Not found User with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      logger.error("Error retrieving User with id=" + id );
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    logger.error("Data to update can not be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Itinerary.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        logger.error(`Cannot update User with id=${id}. Maybe User was not found!`);
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else {
        loggerinfo.info("");
        res.send({ message: "User was updated successfully." });}
    })
    .catch(err => {
      logger.error("Error updating User with id=" + id);
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
    
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Itinerary.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        logger.error(`Cannot delete itinerary with id=${id}. Maybe itinerary was not found!`);
        res.status(404).send({
          message: `Cannot delete itinerary with id=${id}. Maybe itinerary was not found!`
        });
      } else {
        loggerinfo.info("");
        res.send({
          message: "Itinerary was deleted successfully!"
        });
      }
    })
    .catch(err => {
      logger.error("Could not delete itinerary with id=" + id);
      res.status(500).send({
        message: "Could not delete itinerary with id=" + id
      });
    });
};

// Delete all itineraries from the database.
exports.deleteAll = (req, res) => {
    Itinerary.deleteMany({})
    .then(data => {
      loggerinfo.info("");
      res.send({
        message: `${data.deletedCount} itinerary were deleted successfully!`
      });
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while removing all itineraries.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries."
      });
    });
};

