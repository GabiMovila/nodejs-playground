"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = 8080;
app_1["default"].listen(port, function () { return console.log('application started on port: ', port); });
