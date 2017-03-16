module.exports = function (app, mongoClient) {

    var url = "mongodb://localhost:27017/ttodb";
    app.get("/api/resultMeetings3", function (req, res) {

        mongoClient.connect(url, function (err, db) {
            db.collection("resultMeetings3").distinct("Country", function (err, user) {
                console.log("Result Find:", user.length);
                db.collection("resultMeetings3").find({ Country: user[1] }).toArray(function (err, user) {
                    res.send(resultMeetings3)
                    console.log("Result Find:", user.length);
                    db.close();
                })
            });
        });
        // mongoClient.connect(url, function (err, db) {
        //     db.collection("resultMeetings3").aggregate([

        //         { $group: { _id: "$Country", results: { $push: "$$ROOT" } } }
        //     ]).toArray(function (err, result) {
        //         //console.log("Result group by :", result);
        //         res.send(result)
        //         db.close();
        //     })
        // });

        // mongoClient.connect(url, function (err, db) {
        //     db.collection("resultMeetings3").find({ Country: "Asia" }).toArray(function (err, resultMeetings3) {
        //         res.send(resultMeetings3)
        //         db.close();
        //     });
        // });
    });
}