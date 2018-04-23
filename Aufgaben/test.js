fs = require ('fs');


var path1 = "./staedte.json";
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

var userpromise1 = getFile(path1);
var userdetails;

userpromise.then(function(result) { userdetails = result;

    }).then(function(result) {

        JSON.parse(userdetails);

    }).catch(function(err) {
        console.log(err);
    });
