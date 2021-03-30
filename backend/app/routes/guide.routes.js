module.exports = app => {
  const guides = require("../controllers/guide.controller.js");

  var router = require("express").Router();

  // Create a new Guide
  router.post("/", guides.create);

  // Retrieve all guides
  router.get("/", guides.findAll);

  // Retrieve all published guides
  router.get("/published", guides.findAllPublished);

  // Retrieve a single Guide with id
  router.get("/:id", guides.findOne);

  // Update a Guide with id
  router.put("/:id", guides.update);

  // Delete a Guide with id
  router.delete("/:id", guides.delete);

  // Create a new Guide
  router.delete("/", guides.deleteAll);

  app.use("/api/guides", router);
};
