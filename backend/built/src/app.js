"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var express = require("express");
var cors = require("cors");
var mongodb_1 = require("mongodb");
var mongoose = require("mongoose");
require("dotenv/config");
var app = express();
var allowedOrigins = ['http://localhost:3000'];
var dbConnectionString = "mongodb://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@localhost:27017");
var options = {
    origin: allowedOrigins
};
app.use(cors(options));
function getData(res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, typedResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get('https://www.boredapi.com/api/activity')];
                case 1:
                    response = _a.sent();
                    typedResponse = response.data;
                    res.send(typedResponse);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500);
                    res.send(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
app.get('/hello', function (req, res, next) {
    res.send('Hello world!');
});
app.get('/api', function (req, res) {
    axios_1["default"]
        .get('https://www.boredapi.com/api/activity')
        .then(function (response) {
        var typedResponse = response.data;
        res.send(typedResponse);
    })["catch"](function (error) {
        res.status(500);
        res.send(error.message);
    });
});
app.get('/api2', function (req, res) {
    getData(res);
});
app.get('/mongodb', function (req, res) {
    inputData();
    res.send('1 kitty inserted');
});
app.get('/mongodb2', function (req, res) {
    inputDataWithMongoose();
    res.send('1 kitty inserted');
});
function inputData() {
    mongodb_1.MongoClient.connect(dbConnectionString, function (err, db) {
        var dbo = db.db('node-app-db');
        var catoToBeInserted = { name: 'Jessie', color: 'orange' };
        dbo.collection('Cats').insertOne(catoToBeInserted, function (err, res) {
            if (err)
                throw err;
            console.log('1 kitty inserted');
            db.close();
        });
    });
}
var kittySchema = new mongoose.Schema({
    name: String
});
function inputDataWithMongoose() {
    mongoose.connect(dbConnectionString);
    kittySchema.methods.speak = function speak() {
        var greeting = this.name
            ? 'Meow name is ' + this.name
            : "I don't have a name";
        console.log(greeting);
    };
    var Kitten = mongoose.model('Kitten', kittySchema);
    var kitty = new Kitten({ name: 'Tessie' });
    kitty.speak();
    kitty.save();
}
exports["default"] = app;
