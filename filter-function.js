const Farmer = require('./Farmer');

console.log(JSON.stringify(new Farmer().filterByCropType('corn', 2019)));