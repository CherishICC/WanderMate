const db = require("../models");
const Blog = db.blog;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.location) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const newblog = new Blog({
    username:req.body.username,
    location: req.body.location,
    experience:req.body.experience,
    // published: req.body.published ? req.body.published : false
  });

  newblog
    .save(newblog)
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
  const location = req.query.location;
  var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } } : {};
  Blog.find(condition)
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

  Blog.findById(id)
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

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Blog.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete blog with id=${id}. Maybe blog was not found!`
        });
      } else {
        res.send({
          message: "blog was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete blog with id=" + id
      });
    });
};

// Delete all itineraries from the database.
exports.deleteAll = (req, res) => {
    Blog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} blog were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraries."
      });
    });
};