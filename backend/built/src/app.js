"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
require("dotenv/config");
var bodyParser = require("body-parser");
var db_1 = require("./config/db");
(0, db_1["default"])();
var app = express();
var allowedOrigins = ['http://localhost:3000'];
var options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/facts', require('./routes/factRoutes'));
//truthy
exports["default"] = app;
