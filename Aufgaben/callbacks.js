fs = require ('fs');

var list;
var list2;
var list3;

fs.readFile("./staedte.json", function(err, data1) {

    list2 = data1;

    fs.readFile("./mehr_staedte.json", function(err, data2){

        if (err) console.log(error);


        else list = data2;
        var daten = JSON.parse(list);

        var daten2 = JSON.parse(list2);

        list3 = daten.cities.concat(daten2.cities);
        console.log(list3);
    });
});

