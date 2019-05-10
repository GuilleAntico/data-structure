const farmers = require('./structure');

const filterByCropType = ( cropType, year )=> {
    try {
        if (cropType !== 'corn' && cropType !== 'soybean') throw new Error('Invalid cropType, must be corn or soybean');
        const names = [];
        farmers.forEach(farmer => {
            let plantingEvents = [];
            if(farmer.farms.length){
                farmer.farms.forEach( farm => {
                    const result = farm.plantingEvents.filter( pe => pe.cropType === cropType && checkIfSameYear(year, pe.date));
                    if(result && result.length) plantingEvents = result;
                });
            }
            if(plantingEvents.length){
                names.push({
                    name : farmer.name,
                    plantingEvents
                })
            }
        });
        return names;
    }catch(error){
        return error;
    }
}

const checkIfSameYear = (year, date) => {
    const formattedYear = new Date(date).getFullYear();
    return (formattedYear === year);
}

console.log(JSON.stringify(filterByCropType('corn', 2019)));