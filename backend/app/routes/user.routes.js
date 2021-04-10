const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const cust_controller = require("../controllers/customer.controller");
const guide_controller = require("../controllers/itinerary.controller");
const book_controller = require("../controllers/booking.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  // user booking
  app.post(
    "/api/test/booking",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.create
  );
  app.get(
    "/api/test/booking",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.findAll
  );
  app.get(
    "/api/test/booking/:id",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.findOne
  );
  app.put(
    "/api/test/booking/:id",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.update
  );
  app.delete(
    "/api/test/booking/:id",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.delete
  );
  app.delete(
    "/api/test/booking",
    [authJwt.verifyToken, authJwt.isUser],
    book_controller.deleteAll
  );
  // 
  app.get(
    "/api/test/package-booking",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.findAll
  );
  app.get(
    "/api/test/package-booking/:id",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.findOne
  );


  // guide
  app.post(
    "/api/test/package",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.create
  );
  app.get(
    "/api/test/package",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.findAll
  );
  app.get(
    "/api/test/package/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.findOne
  );
  app.put(
    "/api/test/package/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.update
  );
  app.delete(
    "/api/test/package/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.delete
  );
  app.delete(
    "/api/test/package",
    [authJwt.verifyToken, authJwt.isGuide],
    guide_controller.deleteAll
  );
  

  // admin
  app.post(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.create
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.findAll
  );
  app.get(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.findOne
  );
  app.put(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.update
  );
  app.delete(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.delete
  );
  app.delete(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.deleteAll
  );
};
