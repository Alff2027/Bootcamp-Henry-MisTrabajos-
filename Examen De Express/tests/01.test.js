const expect = require('chai').expect
const controller = require('../controllers/controllers')

describe('---------- `addCat`----------', function () {
  beforeEach(function () {
    controller.reset()
  })



  it('Agrega gatos a la lista y devuelve un mensaje de confirmación', function () {
    expect(controller.addCat('Fifi')).to.deep.eql({
      name: 'Fifi',
      age: '1 year',
      color: [],
      accessories: []
    })
    expect(controller.addCat('Bubbles')).to.deep.eql({
      name: 'Bubbles',
      age: '1 year',
      color: [],
      accessories: []
    })

  })
  it('Si el name del gato o gata ya existe, no se agrega a la lista y devuelve un error', function () {
    controller.addCat('Fifi', 'pink')
    controller.addCat('Bubbles', 'blue')
    expect(() => controller.addCat('Bubbles', 'red')).to.throw('El gato o gata ya existe')

  })
})
