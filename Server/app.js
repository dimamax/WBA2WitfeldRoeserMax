var app = require('express')();
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.use(bodyParser.json());

app.get('/users/:id', function (req, res) {

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
                res.send(result);
            }
        });
    });
});

app.get('/anzeigen/:id', function (req, res) {

    var thisid = req.params;

    console.log(thisid.id);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("anzeigen").findOne(({"anzeigen_id": parseInt(thisid.id)}), function (err, result) {

            console.log(result);

            if (result == null || result.anzeigen_id!= parseInt(thisid.id)) {
                db.close();
                res.send("diese anzeige existiert nicht");
            }

            else {
                res.send(result);
            }
        });
    });
});

app.get('/anzeigen', function (req, res) {

    var data = req.query;
    console.log(data);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("anzeigen").find({},data).toArray(function(err, result) {

            console.log(result);

            if (result == null ) {
                db.close();
                res.send("diese anzeige existiert nicht");
            }
            else {
                res.send(result);
            }
        });
    });
});

// User aktualisieren
app.put('/users/:id', function(req, res) {

    var updatedata = req.params;
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

app.put('/messages/:id', function(req, res) {

    var getterid = req.params;
    var senderid = req.query;
    var msg = req.body.msg;
    var newmsg = {"from" : senderid.user_id, "to": getterid.id, "msg" : msg};

    console.log(newmsg);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        var values = { $set: {message : newmsg}};
        dbo.collection("profil").updateOne({"user_id": parseInt(getterid.id)}, values,function(err, res) {
            if (err) throw err;
            console.log("msg gesendet");
            db.close();
        });
    });
    res.send("updated");
});

//Neuen User anlegen
app.post('/users', function(req, res) {

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

app.post('/anzeigen', function(req, res) {

    var data = req.body;
    console.log(data.user_id);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Serverdata");

        dbo.collection("anzeigen").findOne(({"anzeigen_id": data.anzeigen_id}), function (err, result) {
            if (err) throw err;
            if (result == null /*|| result.anzeigen_id != data.anzeigen_id*/) {

                dbo.collection("profil").findOne(({"produkte": data.product_id}), function (err, result1) {
                    if (err) throw err;

                    data.username = result1.username;//, result1.ort, result1.plz, result1.stadtteil;
                    data.ort = result1.ort;
                    data.plz = result1.plz;
                    data.stadtteil = result1.stadtteil;

                    console.log(data);
                    dbo.collection("anzeigen").insertOne(data, function (err, res) {
                        if (err) throw err;
                        console.log("Anzeige erstellt");
                        db.close();
                    });
                });

                res.send("Anzeige erstellt");


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

app.delete('/anzeigen/:id', function(req, res) {
    var thisid = req.params;
    var query = {"anzeigen_id" : parseInt(thisid.id)};
    console.log(query);
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("Serverdata");
        dbo.collection("anzeigen").deleteOne(query, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
        res.send("anzeige gelöscht");
    });
});

app.delete('/users/:id', function(req, res) {
    var thisid = req.params;
    var query = {"user_id" : parseInt(thisid.id)};
    console.log(query);
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("Serverdata");
        dbo.collection("profil").deleteOne(query, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
        res.send("benutzer gelöscht");
    });
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});

