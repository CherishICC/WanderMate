const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
const path = __dirname + '/app/views/';
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors({origin:"*"}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

module.exports = app;
