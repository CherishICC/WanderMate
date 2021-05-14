const db = require("../models");
const Chat = db.chat;

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

// Create and Save a new chat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.msg) {
    logger.error("Content can not be empty!");
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  console.log(req.body);
  // Create a chat
  const newchat = new Chat(
    req.body
  );

  newchat
    .save(newchat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while creating the chat.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the chat."
      });
    });
};

exports.guidefindAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const to = req.query.to;
   if(to===""){
  Chat.find({"$or":[{"userId": new ObjectID(req.userId)},{"toUserId":new ObjectID(req.userId)}]})
    .then(data => {
      loggerinfo.info("Chat retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving chat.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chat."
      });
    });}
    else{
      Chat.find({"$or":[{"userId": new ObjectID(req.userId),"toUserId":new ObjectID(req.query.to)},{"toUserId": new ObjectID(req.userId),"userId":new ObjectID(req.query.to)}]})
    .then(data => {
      loggerinfo.info("Chat retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving chat.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chat."
      });
    });
    }
};

// Retrieve all chats from the database.
exports.findAll = (req, res) => {
  var ObjectID = require('mongodb').ObjectID;
  const to = req.query.to;
  

  Chat.find({"$or":[{"userId": new ObjectID(req.userId),"toUserId":new ObjectID(req.query.to)},{"toUserId": new ObjectID(req.userId),"userId":new ObjectID(req.query.to)}]})
    .then(data => {
      loggerinfo.info("Chat retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retrieving chat.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chat."
      });
    });
  
};

// Find a single chat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Chat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found chat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving chat with id=" + id });
    });
};