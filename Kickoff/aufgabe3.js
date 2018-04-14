var fs = require('fs');

fs.readFile("../staedte.json", function(err, data) {

    if(err){console.log(err);
        return;
    }

    daten = JSON.parse(data);

    daten.cities.sort(function (a, b) {

        return a.population - b.population
    })

    fs.writeFile("../staedte_sortiert", JSON.stringify(daten));

});