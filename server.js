var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var mongoxlsx = require('mongo-xlsx');
var moment = require('moment');

var app = express();
var jsonParser = bodyParser.json();
var modelOfExcel = null;


var url = "mongodb://localhost:27017/ttodb";
var xlsx = './files/reports-for-Ambu(1-31.01.2017).xlsx';

app.use(express.static(__dirname + "/public"));




var routes = require('./app');

routes(app, mongoClient);
var database = require('./excelModule')(mongoClient);

app.listen(3000, function () {
    console.log("Сервер ожидает подключения....");
});

