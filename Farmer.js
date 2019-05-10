const sourceFarmers = require('./structure');

class Farmer {
    constructor(farmers=null){
        this.farmers = farmers || sourceFarmers;
    }
    // the method will take cropType and year as params
    filterByCropType( cropType, year ){
        try {
            if (cropType !== 'corn' && cropType !== 'soybean') throw new Error('Invalid cropType, must be corn or soybean');
            if (isNaN(year)) throw new Error('Invalid year format');
            const names = [];
            this.farmers.forEach(farmer => {
                let plantingEvents = [];
                // ask if the farmer has any farm
                if(farmer.farms.length){
                    farmer.farms.forEach( farm => {
                        // filter based on cropType and year condition
                        const result = farm.plantingEvents.filter( pe => pe.cropType === cropType && this.checkIfSameYear(year, pe.date));
                        // now i want to sort Desc the planting events so i can be sure the first item is the most recent
                        if(result && result.length) plantingEvents = this.sortPlantingEventDesc(result)
                    });
                }
                if(plantingEvents.length){
                    names.push({
                        name : farmer.name,
                        plantingEvents
                    })
                }
            });
            // here i want sort the names based on plantingDate
            return this.sortNamesByPlantingDateDesc(names);
        }catch(error){
            throw error;
        }
    }
    sortPlantingEventDesc(plantingEvents){
        return plantingEvents.sort( (a,b)=>{
            const dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA;
        })
    }
    sortNamesByPlantingDateDesc(farmers){
        return farmers.sort( (a, b)=> {
            if (new Date(a.plantingEvents[0].date) < new Date(b.plantingEvents[0].date)) return 1;
            if (new Date(a.plantingEvents[0].date) > new Date(b.plantingEvents[0].date)) return -1;
            return 0;
        })
    }
    checkIfSameYear(year, date){
        const formattedYear = new Date(date).getFullYear();
        return (formattedYear === year);
    }
}

module.exports = Farmer;
