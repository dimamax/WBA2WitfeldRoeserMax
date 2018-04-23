fs = require ('fs');

var list;
var list2;
var list3;

fs.readFile("./staedte.json", function(err, data1) {

    list = JSON.parse(data1);
    console.log(list);

    fs.readFile("./mehr_staedte.json", function(err, data2){

        if (err) console.log(error);

        else list2 = JSON.parse(data2);

        list3 = list.cities.concat(list2.cities);

        console.log(list3);
    });
});