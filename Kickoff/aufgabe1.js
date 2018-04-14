var fs = require('fs');

fs.readFile("../staedte.json", function(err, data) {

    if(err){console.log(err);
    return;
    }

    daten = JSON.parse(data);


    for(var i = 0; i < daten.cities.length  ; i++){
        console.log("name : " + daten.cities[i].name + "\n");
        console.log("country : " + daten.cities[i].country + "\n");
        console.log("population : " + daten.cities[i].population + "\n");
        console.log("------------------------------------------ \n");
    }

});