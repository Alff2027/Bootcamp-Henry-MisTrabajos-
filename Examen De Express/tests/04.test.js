const expect = require('chai').expect

const controller = require('../controllers/controllers')

 describe('---------- `deleteAccessory` y `modifyAccessory` ----------', function () {
  beforeEach(function () {
    controller.reset()
  })

  it('modifyAccessory: si no se encuentra un accesorio con el id asociado, arroja un error', function () {
    let accessories = [{
      id: 3,
      type: 'Necklace',
      color: 'Red',
      description: 'Red Necklace',
      popularity: 'low'
    }, {
      id: 4,
      type: 'Bun',
      color: 'Black',
      description: 'Black Bun',
      popularity: 'low'
    }, {
      id: 5,
      type: 'Necklace',
      color: 'White',
      description: 'Cloudy Necklace',
      popularity: 'low'
    }]
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    expect(() => controller.modifyAccessory({ id: 123 })).to.throw('Accesorio no encontrado')
  })

  it('modifyAccessory: si el objeto viene vacío arroja un error', function () {
    expect(() => controller.modifyAccessory({})).to.throw('No se detectaron cambios a aplicar')
  })

  it('modifyAccessory: modifica el accesorio y lo devuelve', function () {
    const changes = { id: 3, type: 'Necklace', color: 'Black', description: 'Black necklace' }
    let accessories = [{
      id: 3,
      type: 'Necklace',
      color: 'Red',
      description: 'Red Necklace',
      popularity: 'low'
    }, {
      id: 4,
      type: 'Bun',
      color: 'Black',
      description: 'Black Bun',
      popularity: 'low'
    }, {
      id: 5,
      type: 'Necklace',
      color: 'White',
      description: 'Cloudy Necklace',
      popularity: 'low'
    }]
    controller.testAccessories().push(accessories[0], accessories[1], accessories[2])
    expect(() => controller.modifyAccessory({ id: 123 })).to.throw('Accesorio no encontrado')
    expect(JSON.stringify(controller.modifyAccessory(changes))).to.eql(JSON.stringify({...changes, popularity: "low"}))
  })

  it('deleteAccessory: si el id no se encuentra en el array, arroja un error', function () {
    expect(() => controller.deleteAccessory(2)).to.throw('El accesorio con el id 2 no fue encontrado')
  })

  it('deleteAccessory: elimina un accesorio del array y devuelve un mensaje', function () {
    let accessories = [{
      id: 3,
      type: 'Necklace',
      color: 'Red',
      description: 'Red Necklace',
      popularity: 'low'
    }, {
      id: 5,
      type: 'Necklace',
      color: 'White',
      description: 'Cloudy Necklace',
      popularity: 'low'
    }]
    controller.testAccessories().push(accessories[0], accessories[1])
    expect(controller.deleteAccessory(3)).to.eql('El accesorio con el id 3 fue eliminado correctamente')
    expect(controller.testAccessories()).to.have.length(1)
  })
})
