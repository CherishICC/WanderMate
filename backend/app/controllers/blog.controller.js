const db = require("../models");
const Blog = db.blog;

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

// Create and Save a new blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.location) {
    logger.error("Content can not be empty!");
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a blog
  const newblog = new Blog({
    username:req.body.username,
    location: req.body.location,
    experience:req.body.experience,
    // published: req.body.published ? req.body.published : false
  });

  newblog
    .save(newblog)
    .then(data => {
      loggerinfo.info("Blog added.")
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while creating the Package.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the blog."
      });
    });
};

// Retrieve all itineraries from the database.
exports.findAll = (req, res) => {
  const location = req.query.location;
  var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } } : {};
  Blog.find(condition)
    .then(data => {
      loggerinfo.info("Blogs retreived.");
      res.send(data);
    })
    .catch(err => {
      logger.error(err.message || "Some error occurred while retreiving blogs.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    });
};

// Find a single blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found blog with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving blog with id=" + id });
    });
};