const { authJwt } = require("../middlewares");
const cust_controller = require("../controllers/customer.controller");
const role_controller = require("../controllers/role.controller");
const guide_controller = require("../controllers/itinerary.controller");
const book_controller = require("../controllers/booking.controller");
const blog_controller = require("../controllers/blog.controller");
const chat_controller = require("../controllers/chat.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


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

  // list all available packages
  app.get(
    "/api/test/packagebooking",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.findAllpackages
  );
  app.get(
    "/api/test/packagebooking/:id",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.findOne
  );
  app.get(
    "/api/test/packageget/:id",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.findOne
  );
  app.put(
    "/api/test/packagerating/:id",
    [authJwt.verifyToken, authJwt.isUser],
    guide_controller.update
  );


  // user blog
  app.post(
    "/api/test/blog",
    [authJwt.verifyToken, authJwt.isUser],
    blog_controller.create
  );
  app.get(
    "/api/test/blog",
    [authJwt.verifyToken, authJwt.isUser],
    blog_controller.findAll
  );
  app.get(
    "/api/test/blog/:id",
    [authJwt.verifyToken, authJwt.isUser],
    blog_controller.findOne
  );



  // user chat
  app.post(
    "/api/test/chat",
    [authJwt.verifyToken, authJwt.isUser],
    chat_controller.create
  );
  app.get(
    "/api/test/chat",
    [authJwt.verifyToken, authJwt.isUser],
    chat_controller.findAll
  );
  app.get(
    "/api/test/chat/:id",
    [authJwt.verifyToken, authJwt.isUser],
    chat_controller.findOne
  );

  // guide chat
  app.post(
    "/api/test/guidechat",
    [authJwt.verifyToken, authJwt.isGuide],
    chat_controller.create
  );
  app.get(
    "/api/test/userList",
    [authJwt.verifyToken, authJwt.isGuide],
    cust_controller.findAll
  );
  app.get(
    "/api/test/guidechat",
    [authJwt.verifyToken, authJwt.isGuide],
    chat_controller.guidefindAll
  );
  app.get(
    "/api/test/guidechat/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    chat_controller.findOne
  );
  // app.put(
  //   "/api/test/guidechat/:id",
  //   [authJwt.verifyToken, authJwt.isGuide],
  //   chat_controller.update
  // );
  // app.delete(
  //   "/api/test/guidechat/:id",
  //   [authJwt.verifyToken, authJwt.isGuide],
  //   chat_controller.delete
  // );


  
  // guide profile
  app.get(
    "/api/test/guide/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    cust_controller.findOne
  );
  app.put(
    "/api/test/guide/:id",
    [authJwt.verifyToken, authJwt.isGuide],
    cust_controller.update
  );

  // user profile
  app.get(
    "/api/test/user/:id",
    [authJwt.verifyToken, authJwt.isUser],
    cust_controller.findOne
  );
  app.put(
    "/api/test/user/:id",
    [authJwt.verifyToken, authJwt.isUser],
    cust_controller.update
  );

  // admin profile
  app.get(
    "/api/test/adminprofile/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.findOne
  );
  app.put(
    "/api/test/adminprofile/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cust_controller.update
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
    "/api/test/roles",
    [authJwt.verifyToken, authJwt.isAdmin],
    role_controller.findAll
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
};
