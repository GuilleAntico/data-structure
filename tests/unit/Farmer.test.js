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
        const checkIfSameYearSpy = sandbox.spy(farmerInstance, "checkIfSameYear");
        const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "sortPlantingEventDesc");
        const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "sortNamesByPlantingDateDesc");
        const result = farmerInstance.filterByCropType('corn', 2019);
        expect(result).to.deep.equal(expectedValue);
        sandbox.assert.calledTwice(checkIfSameYearSpy);
        sandbox.assert.calledTwice(sortPlantingEventDescSpy);
        sandbox.assert.calledOnce(sortNamesByPlantingDateDescSpy);
    });
    
    it('should throw an error if cropType is invalid', ()=>{
        farmerInstance = new Farmer();
        const checkIfSameYearSpy = sandbox.spy(farmerInstance, "checkIfSameYear");
        const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "sortPlantingEventDesc");
        const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "sortNamesByPlantingDateDesc");
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
        const checkIfSameYearSpy = sandbox.spy(farmerInstance, "checkIfSameYear");
        const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "sortPlantingEventDesc");
        const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "sortNamesByPlantingDateDesc");
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
        const checkIfSameYearSpy = sandbox.spy(farmerInstance, "checkIfSameYear");
        const sortPlantingEventDescSpy = sandbox.spy(farmerInstance, "sortPlantingEventDesc");
        const sortNamesByPlantingDateDescSpy = sandbox.spy(farmerInstance, "sortNamesByPlantingDateDesc");
        const result = farmerInstance.filterByCropType('corn', 2019);
        expect(result).to.deep.equal(expectedValue);
        sandbox.assert.notCalled(checkIfSameYearSpy);
        sandbox.assert.notCalled(sortPlantingEventDescSpy);
        sandbox.assert.calledOnce(sortNamesByPlantingDateDescSpy);
    });
    
    describe('sortPlantingEventDesc', ()=>{
        it('should')
    })
});