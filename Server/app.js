var express = require('express');
var app = express();
var fs = require('fs');

app.get('/profile/1233', function (req, res) {

    fs.readFile("./profile/1233.json", function(err, data) {

        if (err) {
            console.log(err);
            return;
        }

        daten = JSON.parse(data);

        res.send(daten);
    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});