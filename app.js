
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




module.exports = function (app, mongoClient) {

    var url = "mongodb://localhost:27017/ttodb";



    app.get('/api/getFilter', function (req, res) {
        var from = new Date(req.query['from']);
        var to = new Date(req.query['to']);

        mongoClient.connect(url, function (err, db) {
            db.collection("resultEmais_Meetings").aggregate([
                { $match: { Sent: { $gte: from, $lte: to } } },
                { $group: { _id: "$Country", count: { $sum: 1 } } }
            ]).toArray(function (err, result) {

                var options = {
                    labels: result.map(function (e) { return e._id }),
                    datasets: [{
                        data: result.map(function (e) { return e.count }),
                        backgroundColor: result.map(function (e) { return getRandomColor() }),
                        hoverBackgroundColor: result.map(function (e) { return getRandomColor() })
                    }]
                }

                res.send(options)
                db.close();
            })
        });

    })

    app.get('/api/getEmails', function (req, res) {
        var from = new Date(req.query['from']);
        var to = new Date(req.query['to']);
        mongoClient.connect(url, function (err, db) {
            db.collection("resultEmais_Meetings").aggregate([
                { $match: { $or: [{ Sent: { $gte: from, $lte: to } }, { MeetingDate: { $gte: from, $lte: to } }] } },
                { $group: { _id: "$Type", count: { $sum: 1 } } }
            ]).toArray(function (err, result) {

                var options = {
                    labels: result.map(function (e) { return e._id }),
                    datasets: [{
                        data: result.map(function (e) { return e.count }),
                        backgroundColor: result.map(function (e) { return getRandomColor() }),
                        hoverBackgroundColor: result.map(function (e) { return getRandomColor() })
                    }]
                }


                res.send(options)
                db.close();
            })
        });
    })

    app.get('/api/getTable', function (req, res) {
        var from = new Date(req.query['from']);
        var to = new Date(req.query['to']);
        mongoClient.connect(url, function (err, db) {
            db.collection("resultEmais_Meetings").aggregate([

                {
                    $match: { $or: [{ Sent: { $gte: from, $lte: to } }, { MeetingDate: { $gte: from, $lte: to } }] }
                }], (function (err, result) {

                    res.send(result)
                    db.close();
                })
            )
        })
    });

}