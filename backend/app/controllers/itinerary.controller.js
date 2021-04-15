const db = require("../models");
const Itinerary = db.itinerary;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const itinerary = new Itinerary({
    username:req.body.username,
    package_name: req.body.package_name,
    location: req.body.location,
    days:req.body.days,
    cost: req.body.cost,
    // published: req.body.published ? req.body.published : false
  });

  itinerary
    .save(itinerary)
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

// Retrieve all itineraries from the database.
exports.findAll = (req, res) => {
  const package_name = req.query.package_name;
  var condition = package_name ? { package_name: { $regex: new RegExp(package_name), $options: "i" } } : {};
  Itinerary.find(condition)
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

  Itinerary.findById(id)
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

  Itinerary.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Itinerary.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete itinerary with id=${id}. Maybe itinerary was not found!`
        });
      } else {
        res.send({
          message: "itinerary was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete itinerary with id=" + id
      });
    });
};

// Delete all itineraries from the database.
exports.deleteAll = (req, res) => {
    Itinerary.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} itinerary were deleted successfully!`
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
//     Itinerary.find({ published: true })
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
