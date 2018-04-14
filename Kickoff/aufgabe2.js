var fs = require('fs');
const chalk = require('Chalk');

fs.readFile("../staedte.json", function(err, data) {

    if(err){console.log(err);
        return;
    }

    daten = JSON.parse(data);


    for(var i = 0; i < daten.cities.length  ; i++){
        console.log("name : " + chalk.blue(daten.cities[i].name + "\n"));
        console.log("country : " + chalk.green(daten.cities[i].country + "\n"));
        console.log("population : " + chalk.red(daten.cities[i].population + "\n"));
        console.log(chalk.yellow("------------------------------------------ \n"));
    }

});