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


var getJsDateFromExcel = function (Date) {
    return Date = new Date((excelDate - (25567 + 2)) * 86400 * 1000)
};


var mapFirst = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        Sent: getJsDateFromExcel(element.Sent),
        LastAction: getJsDateFromExcel(element['Last Action']),
        Client: element.Client
    }
}

var mapSecond = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        MeetingDate: getJsDateFromExcel(element['Meeting date']),
        Client: element.Client,
        Duration: element.Duration
    }
}

// var initData = require('./excelModule')(mongoClient);

// app.get("/api/resultMeetings3", function (req, res) {

//         mongoClient.connect(url, function (err, db) {
//             db.collection("resultMeetings3").distinct("Country", function (err, user) {
//                 console.log("Result Find:", user.length);
//                 db.collection("resultMeetings3").find({ Country: user[1] }).toArray(function (err, user) {
//                     res.send(user)
//                     console.log("Result Find:", user.length);
//                     db.close();
//                 })
//             });
//         });
// });
// app.get("/api/resultMeetings3?from=2017-01-22&to=2017-01-26", function (req, res) {

//         mongoClient.connect(url, function (err, db) {
//             db.collection("resultMeetings3").distinct("Country", function (err, user) {
//                 console.log("Result Find2:", user.length);
//                 db.collection("resultMeetings3").find({ Country: user[2] }).toArray(function (err, user) {
//                     res.send(user)
//                     console.log("Result Find2:", user.length);
//                     db.close();
//                 })
//             });
//         });
// });
// app.get("/api/resultMeetings3?Country=${Country}", function (req, res) {

//         mongoClient.connect(url, function (err, db) {
//             db.collection("resultMeetings3").distinct("Country", function (err, user) {
//                 console.log("Result Find3:", user.length);
//                 db.collection("resultMeetings3").find({ Country: user[3] }).toArray(function (err, user) {
//                     res.send(user)
//                     console.log("Result Find3:", user.length);
//                     db.close();
//                 })
//             });
//         });
// });

var routes = require('./app');

routes(app, mongoClient);

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});

