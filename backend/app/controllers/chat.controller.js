const db = require("../models");
const Chat = db.chat;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.msg) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const newchat = new Chat({
    userId:req.body.userId,
    from:req.body.from,
    to: req.body.to,
    msg:req.body.msg,
    // published: req.body.published ? req.body.published : false
  });

  newchat
    .save(newchat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the chat."
      });
    });
};

exports.guidefindAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  Chat.find({"userId": new ObjectID(req.userId)})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chat."
      });
    });
};

// Retrieve all itineraries from the database.
exports.findAll = (req, res) => {
  console.log(req.query);
  // var ObjectID = require('mongodb').ObjectID;
  // const to = req.query.to;
  // var condition = to ? { to: { $regex: new RegExp(to), $options: "i" } } : {};
  // var condition1 = from ? { from: { $regex: new RegExp(to), $options: "i" } } : {};
  // console.log(condition1);
  // { $and: [ {"userId": new ObjectID(req.userId)}, condition ] }
  Chat.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chat."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Chat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving chat with id=" + id });
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

  Chat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update chat with id=${id}. Maybe chat was not found!`
        });
      } else res.send({ message: "Chat was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating chat with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Chat.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete chat with id=${id}. Maybe chat was not found!`
        });
      } else {
        res.send({
          message: "chat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete chat with id=" + id
      });
    });
};

// Delete all itineraries from the database.
exports.deleteAll = (req, res) => {
    Chat.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} chat were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Chats."
      });
    });
};