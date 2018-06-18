var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.use(bodyParser.json());

/* app.use(bodyParser.urlencoded({
    extended: true
})); */

/*app.get('/user', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("profiles").find({}).toArray(function (err, result) {

            console.log(result);
            res.send(result);

        });
    });
});*/


// User anhand der ID in den Params zurückliefern: Coordinaten werden nicht mitgesendet
app.get('/user/:id', function (req, res) {

    var thisid = req.params;

    console.log(thisid.id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("profil").findOne(({"user_id": parseInt(thisid.id)}), function (err, result) {

           console.log(result);

            if (result == null || result.user_id!= parseInt(thisid.id)) {
                db.close();
                res.send("This user doesn't exist");
            }

            else {
                delete result.coordinates;

                res.send(result);
            }
        });
    });
});

app.get('/user/:id/coordinates', function (req, res) {

    var thisid = req.params;

    console.log(thisid.id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("profil").findOne(({"user_id": parseInt(thisid.id)}), function (err, result) {

            console.log(result);

            if (result == null || result.user_id!= parseInt(thisid.id)) {
                db.close();
                res.send("This user doesn't exist");
            }

            else {

                res.send(result.coordinates);
            }
        });
    });
});

// User aktualisieren
app.put('/user', function(req, res) {

    var updatedata = req.query;
    var newvalues = req.body;

    console.log(updatedata, newvalues);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        var values = { $set: newvalues };
        dbo.collection("profil").updateOne(updatedata, values, function(err, res) {
            if (err) throw err;
            console.log("userdata updated");
            db.close();
        });
    });

    res.send("updated");
});


//Neuen User anlegen
app.post('/user', function(req, res) {

    var user = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        console.log(typeof user.user_id);

        dbo.collection("profil").findOne(({"user_id": user.user_id}), function (err, result) {

            if (result == null || result.user_id != user.user_id ) {
                    dbo.collection("profil").insertOne(user, function (err, res) {
                        if (err) throw err;
                        console.log("User created");
                        db.close();
                    });

                    res.send("user created");
                }

                else {
                    console.log("Fehler");
                    res.send("Fehler: ID schon vorhanden");
                }
        });
    });
});

// Produkt nach name zurückliefern
app.get('/produkt', function (req, res) {

    var prodname = req.query.pname;

    console.log(prodname);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("produkt").find({"name" : prodname}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);

            if (result == null || toString(result.name) != toString(prodname)) {
                db.close();
                res.send("No product found");
            }

            else {
                res.send(result);
            }
        });
    });
});

// Produkt nach ID zurückliefern
app.get('/produkt/:productid', function (req, res) {

    var thisid = req.params.productid;

    console.log(thisid);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("produkt").findOne(({"product_id" : parseInt(thisid)}), function (err, result) {

            console.log(result);

            if (result == null || result.product_id != thisid ) {
                db.close();
                res.send("There is no product with this ID");
            }

            else {
                res.send(result);
            }
        });
    });
});


//Neues Produkt anlegen
app.post('/produkt', function(req, res) {

    var post = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("produkt").insertOne(post, function(err, res) {
            if (err) throw err;
            console.log("1 Produkt hinzugefügt");
            db.close();
        });
    });
    res.send("Produkt hinzugefügt");
});


//Produkt aktualisieren
app.put('/produkt', function(req, res) {

    var updatedata = parseInt(req.query.product_id);
    var newvalues = req.body;

    console.log(typeof updatedata, newvalues);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");
        var values = { $set: newvalues };

        dbo.collection("produkt").updateOne({"product_id" : updatedata}, values, function(err, res) {
            if (err) throw err;
            console.log("product-data updated");
            db.close();
        });
    });
    res.send("Produkte aktualisiert");
});


app.listen(3000, function () {
    console.log('listening on port 3000!');
});

