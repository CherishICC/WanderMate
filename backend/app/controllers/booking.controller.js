const db = require("../models");
const Booking = db.booking;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const booking = new Booking({
    userId:req.body.userId,
    username:req.body.username,
    guide: req.body.guide,
    package_name: req.body.package_name,
    location: req.body.location,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    review:req.body.review,
    rating:req.body.rating,
    // published: req.body.published ? req.body.published : false
  });

  booking
    .save(booking)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving itineraries."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

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
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete booking with id=${id}. Maybe booking was not found!`
        });
      } else {
        res.send({
          message: "booking was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete booking with id=" + id
      });
    });
};

// Delete all itineraries from the database.
exports.deleteAll = (req, res) => {
    Booking.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} booking were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries."
      });
    });
};

// Find all published itineraries
// exports.findAllPublished = (req, res) => {
//     booking.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving itineraries."
//       });
//     });
// };
