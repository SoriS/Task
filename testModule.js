
var url = "mongodb://localhost:27017/ttodb";
var getTestData = function (mongoClient) {

    //     db.books.aggregate(
    //    [
    //      { $group : { _id : "$author", books: { $push: "$$ROOT" } } }
    //    ]
    // )


    mongoClient.connect(url, function (err, db) {
        db.collection("resultMeetings3").aggregate([
            { $group: { _id: "$Country", results: { $push: "$$ROOT" } } }
        ]).toArray(function (err, result) {
            console.log("Result group by :", result);
            db.close();
        })
    });
}

module.exports = getTestData;