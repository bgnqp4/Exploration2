//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient;

// Connect to DB
MongoClient.connect('mongodb://localhost/test', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    // Perform all CRUD operations 

    // Create new zipcode
    db.collection("zipcodes").insertOne({_id:"1337", city : "SAINT LOUIS", "loc" : [ -92.28187, 40.661619 ], "pop" : 1, "state" : "MO"}, 
            function(err, result) {
                if(err != null) {
                    console.log("ERROR\n");
                } else {
                    console.log("Successful insert\n");
                }
    });

    // Update new zipcode
    db.collection("zipcodes").updateOne({_id:"1337"}, { $set: { "pop": 2 } }, 
            function(err, result) {
                if(err != null) {
                    console.log("ERROR\n");
                } else {
                    console.log("Successful update\n");
                }
    });

    // Find all zipcodes in the city of Saint Louis
    var cursor = db.collection("zipcodes").find({city : "SAINT LOUIS"});

    cursor.each(function(err, doc) {
        if(doc != null) {
            console.log(doc);
        } else {
            // Finished displaying so delete new zipcode
            deleteFunction(db);
        }
    });
});

var deleteFunction = function(db) {
    // Delete new zipcode
    db.collection("zipcodes").deleteOne({_id:"1337"}, 
            function(err, result) {
                if(err != null) {
                    console.log("ERROR\n");
                } else {
                    console.log("Successful delete\n");
                }
    });
}