const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");
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
  if (!req.body.username) {
    logger.error("Content can not be empty!");
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    email: req.body.email,
    // pref1: req.body.pref1,
    // pref2: req.body.pref2,
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      loggerinfo.info("User created.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while creating the User.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
  User.find(condition)
    .then(data => {
      loggerinfo.info("Users retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving users.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data){
      logger.error("Not found User with id " + id);
      res.status(404).send({ message: "Not found User with id " + id });
      }
      else res.send(data);
    })
    .catch(err => {
      logger.error("Error retrieving User with id=" + id);
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    logger.error("Data to update cannot be empty!");
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  req.body.password = bcrypt.hashSync(req.body.password, 8)
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        logger.error(`Cannot update User with id=${id}. Maybe User was not found!`);
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
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

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        logger.error(`Cannot delete User with id=${id}. Maybe User was not found!`);
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        loggerinfo.info("User was deleted successfully!");
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      logger.error("Could not delete User with id=" + id);
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
