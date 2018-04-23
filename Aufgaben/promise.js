fs = require('fs');

var path1 = "./staedte.json";
var path2 = "./mehr_staedte.json";

function getFile(path) {

    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data1) {
            if (err) reject(err);

            else {
                var daten = JSON.parse(data1);
                resolve(daten);
            }
        });
    });
}

var finalFile;
var userdetails1;
var userdetails2;
var userpromise1 = getFile(path1);
var userpromise2 = getFile(path2);

userpromise1.then(function(result1) { userdetails1 = result1;

    }).then(function(result1) {
        userpromise2.then(function(result) { userdetails2 = result;

            }).then(function(result) {

                finalFile = userdetails1.cities.concat(userdetails2.cities);
                console.log(finalFile);

            }).catch(function(err) {
                console.log(err);
            });

    }).catch(function(err) {
        console.log(err);
    });