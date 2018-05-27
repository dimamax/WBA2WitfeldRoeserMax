fs = require ('fs');

const fire = require('firebase-rest');
const firebase = fire.factory('481760469482-coatq22o9aepqf1li2f2lqjio5h017cn.apps.googleusercontent.com');
const ref = firebase({paths: '/Test', auth: 'rPPVQ3TqlzSS1gBuwn0nLaYpn'});




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

var userpromise = getFile(path1);
var userdetails;

userpromise.then(function(result) { userdetails = result;


}).then(function(result) {
    //console.log(userdetails);

}).catch(function(err) {
    console.log(err);
});


