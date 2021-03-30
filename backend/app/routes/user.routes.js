module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Guide
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve all published users
    router.get("/published", users.findAllPublished);
  
    // Retrieve a single Guide with id
    router.get("/:id", users.findOne);
  
    // Update a Guide with id
    router.put("/:id", users.update);
  
    // Delete a Guide with id
    router.delete("/:id", users.delete);
  
    // Create a new Guide
    router.delete("/", users.deleteAll);
  
    app.use("/api/users", router);
  };
  