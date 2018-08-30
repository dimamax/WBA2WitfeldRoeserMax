var express = require('express'),
    http = require('http'),
    request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var stdio = require('stdio');
var stdin = process.openStdin();

/*

let loggedIn = false;
let uName;

    if (parseInt(eingabe) == 1) {
        console.log("Eneter Username");
        stdin.addListener("data", function(d) {
            uName = d;
            console.log(d.toString().trim());

            stdin.addListener("pass", function(p) {

                pass = p;
                console.log(d.toString().trim());
        });
    });
   }
});


/*

/*socket.on('event', function(data){});
socket.on('disconnect', function(){});*/

/*
var stdin = process.openStdin();
var uname;
var pass;

console.log("enter id");

stdin.addListener("data", function(d) {

    console.log("you entered: " +
        d.toString().trim());
    uname = d.toString().trim();

    console.log("enter password: ");

    stdin.addListener("data", function(d) {
        pass= d.toString().trim();
    });
});
*/

var dHost = 'http://localhost';
var dPort = 3000;
var dUrl = dHost + ':' + dPort;

var realUser = false;

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
    var newmsg = {"from" : parseInt(senderid.user_id), "to": parseInt(getterid.id), "msg" : msg};
    console.log(newmsg);
    var url = dUrl + '/users/' + parseInt(getterid.id) + "?user_id=" + parseInt(senderid.user_id);
    console.log(url);

    request.put({
        url: url,
        body: newmsg,
        json: true
    }, function(error, response, body){
        console.log(body);
        res.send("msg gesendet");
    });
});

app.listen(8080,function(){
    console.log("Dienstnutzer verfügbar auf Port 8080")
});


