"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
require("dotenv/config");
var bodyParser = require("body-parser");
var db_1 = require("./config/db");
var factRoutes_1 = require("./routes/factRoutes");
var errorHandler_1 = require("./middleware/errorHandler");
(0, db_1["default"])();
var app = express();
var allowedOrigins = ['http://localhost:3000'];
var options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler_1["default"]);
app.use('/api/facts', factRoutes_1["default"]);
//truthy
exports["default"] = app;
