const expect = require('chai').expect

const controller = require('../controllers/controllers')

describe('---------- `updateAccesoryPopularity` ----------', function () {
  beforeEach(function () {
    controller.reset()
  })

  it('Actualiza la popularidad del accesorio dependiendo de cuantos gatos lo vistan', function () {
    const cats = [{
      name: 'Fex',
      age: '1 year',
      color: [],
      accessories: []
    }, {
      name: 'Pip',
      age: '1 year',
      color: [],
      accessories: []
    }, {
      name: 'Bubbles',
      age: '1 year',
      color: [],
      accessories: []
    }]
    
    controller.testCats().push(cats[0], cats[1], cats[2])
    const accessories = [{
      id: 1,
      type: 'Sweater',
      color: 'White',
      description: 'White Sweater',
      popularity: 'low'
    },
    {
      id: 2,
      type: 'Bun',
      color: 'Purple',
      description: 'Purple Bun',
      popularity: 'low'
    }]
    controller.testAccessories().push(accessories[0], accessories[1])
    controller.testCats()[0].accessories.push(accessories[0])
    controller.testCats()[0].accessories.push(accessories[1])
    controller.testCats()[1].accessories.push(accessories[0])
    controller.testCats()[2].accessories.push(accessories[0])
    controller.testCats()[2].accessories.push(accessories[1])
    expect(controller.updateAccessoryPopularity(1)).to.eql('La popularidad del accesorio White Sweater fue actualizada a high')
    expect(controller.updateAccessoryPopularity(2)).to.eql('La popularidad del accesorio Purple Bun fue actualizada a average')
    expect(controller.testAccessories()[1].popularity).to.eql('average')
    expect(controller.testAccessories()[0].popularity).to.eql('high')
  })

  it('Si el accesorio no fue actualizado, devuelve un mensaje', function () {
    const accessory = {
      id: 1,
      type: 'Bracelet',
      color: 'Black',
      description: 'Black Bracelet',
      popularity: 'low'
    }
    const cat = {
      name: 'Pip',
      age: '1 year',
      color: [],
      accessories: []
    }
    controller.testAccessories().push(accessory)
    controller.testCats().push(cat)
    controller.testCats()[0].accessories.push(accessory)
    expect(controller.updateAccessoryPopularity(1)).to.eql('No hubieron cambios en la popularidad del accesorio Black Bracelet')
    expect(controller.testAccessories()[0].popularity).to.eql('low')
  })

  it('Si el accesorio no existe devuelve un error', function () {
    expect(() => controller.updateAccessoryPopularity(2)).to.throw('accesorio no encontrado')
  })
})
