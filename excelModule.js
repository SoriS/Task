




function getJsDateFromExcel(excelDate) {

    return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
};

var mapFirst = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        Sent: getJsDateFromExcel(element.Sent),
        LastAction: getJsDateFromExcel(element['Last Action']),
        Client: element.Client,
        Type: "Emails"

    }
}

var mapSecond = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        MeetingDate: getJsDateFromExcel(element['Meeting date']),
        Client: element.Client,
        Duration: element.Duration,
        Type: "Meeting"
    }
}

var url = "mongodb://localhost:27017/ttodb";
var modelOfExcel = null;
var mongoxlsx = require('mongo-xlsx');
var objectId = require("mongodb").ObjectID;

var xlsxCallback = function (mongoClient) {
    return function (err, data) {


        var resultsEmails = data[1].map(mapFirst);
        var resultsMeetings = data[0].map(mapSecond);

        var resultEmais_Meetings = data[1].map(mapFirst);
        resultsEmails.push.apply(resultEmais_Meetings, resultsMeetings)

        mongoClient.connect(url, function (err, db) {
            db.collection("resultEmais_Meetings").insertMany(resultEmais_Meetings, function (error, param) {
                db.close();
            })
        })
    }
}
var getData = function (mongoClient) {

    var xlsx = './files/reports-for-Ambu(1-31.01.2017).xlsx';
    mongoClient.connect(url, function (err, db) {
        db.collection("resultEmais_Meetings").count(function (err, count) {
            if (!err && count === 0) {
                mongoxlsx.xlsx2MongoData(xlsx, modelOfExcel, xlsxCallback(mongoClient));
            }
        });
    });
}

module.exports = getData;
