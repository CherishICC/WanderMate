const db = require("../models");
const Guide = db.guides;

// Create and Save a new Guide
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Guide
  const guide = new Guide({
    title: req.body.title,
    password: req.body.password,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
    // published: req.body.published ? req.body.published : false
  });

  // Save Guide in the database
  guide
    .save(guide)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Guide."
      });
    });
};

// Retrieve all Guides from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Guide.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving guides."
      });
    });
};

// Find a single Guide with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Guide.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Guide with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Guide with id=" + id });
    });
};

// Update a Guide by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Guide.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Guide with id=${id}. Maybe Guide was not found!`
        });
      } else res.send({ message: "Guide was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Guide with id=" + id
      });
    });
};

// Delete a Guide with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Guide.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Guide with id=${id}. Maybe Guide was not found!`
        });
      } else {
        res.send({
          message: "Guide was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Guide with id=" + id
      });
    });
};

// Delete all Guides from the database.
exports.deleteAll = (req, res) => {
  Guide.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Guides were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all guides."
      });
    });
};

// Find all published Guides
exports.findAllPublished = (req, res) => {
  Guide.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving guides."
      });
    });
};
