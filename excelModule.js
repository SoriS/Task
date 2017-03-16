




function getJsDateFromExcel(excelDate) {

    // var s = excelDate.split(",");

    // return new Date(20 + s[2], s[1] + 1, s[0]);
    return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
};

var mapFirst = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        Sent: getJsDateFromExcel(element.Sent),
        LastAction: getJsDateFromExcel(element['Last Action']),
        Client: element.Client,
        Type: element.Emails = "Emails"

    }
}

var mapSecond = function (element) {
    return {
        Country: element.Country,
        Seller: element.Seller,
        MeetingDate: getJsDateFromExcel(element['Meeting date']),
        Client: element.Client,
        Duration: element.Duration,
        Type: element.Meeting = "Meeting"
    }
}

var url = "mongodb://localhost:27017/ttodb";
var modelOfExcel = null;
var mongoxlsx = require('mongo-xlsx');
var objectId = require("mongodb").ObjectID;
var getData = function (mongoClient) {



    var xlsx = './files/reports-for-Ambu(1-31.01.2017).xlsx';

    mongoxlsx.xlsx2MongoData(xlsx, modelOfExcel, function (err, data) {


        var resultsEmails = data[1].map(mapFirst);
        var resultsMeetings = data[0].map(mapSecond);

        var resultEmais_Meetings = data[1].map(mapFirst);
        resultsEmails.push.apply(resultEmais_Meetings, resultsMeetings)
         mongoClient.connect(url, function (err, db) {
             db.collection("resultMeetings").insertMany(resultsMeetings, function (error, param) {
                 console.log(param);
                 db.close();
             })
         })
         mongoClient.connect(url, function (err, db) {
             db.collection("resultEmailss").insertMany(resultsEmails, function (error, param) {
                 console.log(param);
                 db.close();
             })
         })
        mongoClient.connect(url, function (err, db) {
            db.collection("resultEmais_Meetings").insertMany(resultEmais_Meetings, function (error, param) {
                console.log(param);
                db.close();
            })
        })
        // mongoClient.connect(url, function (err, db) {
        //     db.collection("resultMeetings3").find({ _id: objectId("58c97e433a5e199426857694") }).toArray(function (err, user) {
        //         console.log("Result Find:", user);
        //         db.close();
        //     });
        // });



        // mongoClient.connect(url, function (err, db) {
        //     db.collection("resultMeetings3").distinct("Country", function (err, user) {
        //         console.log("Result Find:", user.length);
        //         console.log(db.collection("resultMeetings3").find({ Country: user[1] }).toArray(function (err, user) {
        //             console.log("Result Find:", user.length);
        //             db.close();
        //         }))
        //     });
        // });
    });
}


module.exports = getData;
