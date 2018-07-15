var express = require('express'),
    http = require('http'),
    request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

/*socket.on('event', function(data){});
socket.on('disconnect', function(){});*/

var dHost = 'http://localhost';
var dPort = 3000;
var dUrl = dHost + ':' + dPort;



app.get('/newmessages/:id', function(req,res){

    var thisid = req.params;
    console.log(thisid.id);
    var url = dUrl + '/users/' + thisid.id;
    console.log(url);

    request.get(url, function (err, response, body){
        var user = JSON.parse(body);

        console.log(user.message);
        res.json(user.message);
    });
});


app.get('/produkt', function (req,res) {

    var prodname = req.query.pname;
    var url = dUrl + '/produkt?pname='+ prodname;

    request.get(url, function (err, response, body){
        console.log("Daten werden gesendet");
        body = JSON.parse(body);
        res.send(body);
    });
});

app.get('/users/:id', function (req, res) {

    var thisid = req.params;
    console.log(thisid.id);
    var url = dUrl + '/users/' + thisid.id;
    console.log(url);

    request.get(url, function (err, response, body){
        var user = JSON.parse(body);
        console.log(user);
        res.json(user);
    });
});

app.get('/anzeigen/:id', function (req,res) {

    var thisid = req.params;

    var url = dUrl + '/anzeigen/'+ thisid.id;

    request.get(url, function (err, response, body){
        body = JSON.parse(body);
        res.json(body);
    });
});

app.get('/anzeigen', function (req,res) {

    var thisname = req.query;
    var url = dUrl + '/anzeigen?name=' + thisname.name;

    request.get(url, function (err, response, body){
        body = JSON.parse(body);
        res.json(body);
    });
});

app.post('/anzeigen', function(req, res) {
    var url = dUrl + '/anzeigen';

    var data = req.body;
    console.log(data);

    data.anzeigen_id = Math.floor(Math.random() * 999999);
    console.log(data.anzeigen_id);
    request.post({

        url: url,
        body: data,
        json: true
    }, function(error, response, body){
        console.log(body)
        res.send("anzeige erstellt")
    });
});

app.post('/users', function(req, res) {
    var user = req.body;
    var url = dUrl + '/users';

    request.post({
        url: url,
        body: user,
        json: true
    }, function(error, response, body){
        console.log(body);
        res.send(response);
    });
});

app.put('/messages/:id', function(req, res) {
    var getterid = req.params;
    var senderid = req.query;
    var msg = req.body.msg;
    var newmsg = {"from" : senderid.user_id, "to": getterid.id, "msg" : msg};

    var url = dUrl + '/users/' + getterid.id + "?user_id=" + senderid.user_id;
    console.log(url);

    request.post({
        url: url,
        body: newmsg,
        json: true
    }, function(error, response, body){
        console.log(body);
        res.send(response);
    });
});



app.listen(8080,function(){
    console.log("Dienstnutzer verfügbar auf Port 8080")
});