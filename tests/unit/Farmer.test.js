const { expect } = require('chai');
const sinon = require('sinon');
const Farmer = require('../../Farmer');

describe('Farmer class ', () =>{
    let structure = [];
    let farmerInstance = null;
    let sandbox;
    before(()=> sandbox = sinon.createSandbox());
    
    afterEach(()=>{
        structure = [];
        farmerInstance = null;
        sandbox.restore();
    })

    describe('filterByCropType', ()=>{
        it('should return sorted values correctly', ()=>{
            structure = [
                {
                    name: 'Test A',
                    farms: [
                        {
                            plantingEvents: [
                                {
                                    date: '2019-05-12 00:00:00',
                                    cropType: 'corn'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Test B',
                    farms: [
                        {
                            plantingEvents: [
                                {
                                    date: '2019-05-30 04:00:00',
                                    cropType: 'corn'
                                }
                            ]
                        },
                    ]
                }
            ];
            const expectedValue = [
                {
                    name: 'Test B',
                    plantingEvents: [
                        {
                            date: '2019-05-30 04:00:00',
                            cropType: 'corn'
                        }
                    ]
                },
                {
                    name: 'Test A',
                    plantingEvents: [
                        {
                            date: '2019-05-12 00:00:00',
                            cropType: 'corn'
                        }
                    ]
                }
            ];
            farmerInstance = new Farmer(structure);
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "_sortPlantingEventDesc");
            const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "_sortNamesByPlantingDateDesc");
            const result = farmerInstance.filterByCropType('corn', 2019);
            expect(result).to.deep.equal(expectedValue);
            sandbox.assert.calledTwice(checkIfSameYearSpy);
            sandbox.assert.calledTwice(sortPlantingEventDescSpy);
            sandbox.assert.calledOnce(sortNamesByPlantingDateDescSpy);
        });
    
        it('should throw an error if cropType is invalid', ()=>{
            farmerInstance = new Farmer();
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "_sortPlantingEventDesc");
            const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "_sortNamesByPlantingDateDesc");
            try{
                farmerInstance.filterByCropType('somethingElse', 2019);
            }catch(e){
                console.log(e.message);
                expect(e).to.be.instanceof(Error);
                expect(e.message).to.equal('Invalid cropType, must be corn or soybean');
                sandbox.assert.notCalled(checkIfSameYearSpy);
                sandbox.assert.notCalled(sortPlantingEventDescSpy);
                sandbox.assert.notCalled(sortNamesByPlantingDateDescSpy);
            }
        });
        it('should throw an error if year is invalid', ()=>{
            farmerInstance = new Farmer();
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "_sortPlantingEventDesc");
            const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "_sortNamesByPlantingDateDesc");
            try{
                farmerInstance.filterByCropType('soybean', 'invalid');
            }catch(e){
                console.log(e.message);
                expect(e).to.be.instanceof(Error);
                expect(e.message).to.equal('Invalid year format');
                sandbox.assert.notCalled(checkIfSameYearSpy);
                sandbox.assert.notCalled(sortPlantingEventDescSpy);
                sandbox.assert.notCalled(sortNamesByPlantingDateDescSpy);
            }
        });
        it('should return empty if all farms are empty', ()=>{
            structure = [
                {
                    name: 'Test A',
                    farms: []
                },
                {
                    name: 'Test B',
                    farms: []
                }
            ];
            const expectedValue = [];
            farmerInstance = new Farmer(structure);
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "_sortPlantingEventDesc");
            const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "_sortNamesByPlantingDateDesc");
            const result = farmerInstance.filterByCropType('corn', 2019);
            expect(result).to.deep.equal(expectedValue);
            sandbox.assert.notCalled(checkIfSameYearSpy);
            sandbox.assert.notCalled(sortPlantingEventDescSpy);
            sandbox.assert.calledOnce(sortNamesByPlantingDateDescSpy);
        });
    
    })
    describe('_sortPlantingEventDesc', ()=>{
        // since these are internal methods of the class i only test the okay result.
        it('should sort data correctly', ()=>{
            const plantingEvents = [
                {
                    date: '2018-03-12 14:00:00',
                    cropType: 'soybean'
                },
                {
                    date: '2018-03-20 05:00:00',
                    cropType: 'corn'
                },
            ];
            const expectedValue = [
                {
                    date: '2018-03-20 05:00:00',
                    cropType: 'corn'
                },
                {
                    date: '2018-03-12 14:00:00',
                    cropType: 'soybean'
                },
            ];
            farmerInstance = new Farmer();
            const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "_sortPlantingEventDesc");
            const result = farmerInstance._sortPlantingEventDesc(plantingEvents);
            expect(result).to.deep.equal(expectedValue);
            sandbox.assert.calledOnce(sortPlantingEventDescSpy);
            
        })
    });
    describe('_checkIfSameYear', ()=>{
        // since these are internal methods of the class i only test the okay result.
        it('should return true if matches year', ()=>{
            const year = 2019;
            farmerInstance = new Farmer();
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const result = farmerInstance._checkIfSameYear(year, new Date());
            expect(result).to.equal(true);
            sandbox.assert.calledOnce(checkIfSameYearSpy);
        });
        it('should return false if matches year', ()=>{
            const year = 2018;
            farmerInstance = new Farmer();
            const checkIfSameYearSpy = sandbox.spy(farmerInstance, "_checkIfSameYear");
            const result = farmerInstance._checkIfSameYear(year, new Date());
            expect(result).to.equal(false);
            sandbox.assert.calledOnce(checkIfSameYearSpy);
        })
    });
    describe('_sortNamesByPlantingDateDesc', ()=>{
        // since these are internal methods of the class i only test the okay result.
        it('should return sorted names', ()=>{
            const farmers = [
                {
                    plantingEvents: [
                        {
                            date: '2019-05-12 00:00:00',
                            cropType: 'corn'
                        }
                    ]
                },
                {
                    plantingEvents: [
                        {
                            date: '2019-05-30 04:00:00',
                            cropType: 'corn'
                        }
                    ]
                },
            ];
            const expectedValue = [
                {
                    plantingEvents: [
                        {
                            date: '2019-05-30 04:00:00',
                            cropType: 'corn'
                        }
                    ]
                },
                {
                    plantingEvents: [
                        {
                            date: '2019-05-12 00:00:00',
                            cropType: 'corn'
                        }
                    ]
                },
            ]
            farmerInstance = new Farmer(farmers);
            const _sortNamesByPlantingDateDesc = sandbox.spy(farmerInstance, "_sortNamesByPlantingDateDesc");
            const result = farmerInstance._sortNamesByPlantingDateDesc(farmers);
            expect(result).to.deep.equal(expectedValue);
            sandbox.assert.calledOnce(_sortNamesByPlantingDateDesc);
        })
    })
});