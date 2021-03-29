module.exports = app => {
  const guides = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", guides.create);

  // Retrieve all guides
  router.get("/", guides.findAll);

  // Retrieve all published guides
  router.get("/published", guides.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", guides.findOne);

  // Update a Tutorial with id
  router.put("/:id", guides.update);

  // Delete a Tutorial with id
  router.delete("/:id", guides.delete);

  // Create a new Tutorial
  router.delete("/", guides.deleteAll);

  app.use("/api/guides", router);
};
