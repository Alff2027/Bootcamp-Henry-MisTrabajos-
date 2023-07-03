const expect = require('chai').expect

const controller = require('../controllers/controllers')
describe('---------- `addCatAccessory` ----------', function () {
  beforeEach(function () {
    controller.reset()
  })

  it('Agrega el accesorio', function () {
    const accessories = [{
      id: 4,
      type: 'Bun',
      color: 'Gold',
      description: 'Golden Bun',
      popularity: 'low'
    },
    {
      id: 7,
      type: 'Shoes',
      color: 'Red',
      description: 'Red Shoes',
      popularity: 'low'
    }]
    const cat = {
      name: 'Fifix',
      age: '1 year',
      color: [],
      accessories: []
    }
    controller.testCats().push(cat)
    controller.testAccessories().push(accessories[0], accessories[1])
    expect(controller.addCatAccessory('Fifix', accessories[0])).to.eql('El accesorio Bun fue agregado a Fifix con exito')
    controller.addCatAccessory('Fifix', accessories[1])
    expect(controller.testCats()[0].accessories).to.have.length(2)
  })

  it('Si el gato no existe, arroja un error', function () {
    expect(() => controller.addCatAccessory('Fifi')).to.throw('El gato Fifi no existe')
  })

  it('Si el gato ya tiene el accesorio, devuelve un error', function () {
    const accessories = [{
      id: 4,
      type: 'Bun',
      color: 'Gold',
      description: 'Golden Bun',
      popularity: 'low'
    },
    {
      id: 7,
      type: 'Shoes',
      color: 'Red',
      description: 'Red Shoes',
      popularity: 'low'
    }]
    const cat = {
      name: 'Fifix',
      age: '1 year',
      color: [],
      accessories: [],
    }
    controller.testCats().push(cat);
    controller.testAccessories().push(accessories[0], accessories[1])
    controller.addCatAccessory('Fifix', accessories[0])
    expect(() => controller.addCatAccessory('Fifix', accessories[0])).to.throw('El gato Fifix ya tiene el accesorio puesto')
    expect(controller.testCats()[0].accessories).to.have.length(1)
  })
})
